import fs from 'fs';
import path from 'path';

// Base directory for all file operations
export const UPLOADS_DIR = path.resolve("./uploads");

/**
 * Deletes a single file.
 * @param relativeFilePath Path relative to UPLOADS_DIR.
 */
export async function deleteFileUtil(relativeFilePath: string): Promise<void> {
  const absoluteFilePath = path.join(UPLOADS_DIR, relativeFilePath);
  try {
    await fs.promises.unlink(absoluteFilePath);
    console.log(`Successfully deleted file: ${absoluteFilePath}`);
  } catch (error: any) {
    if (error.code === 'ENOENT') { // File not found
      console.warn(`Attempted to delete non-existent file: ${absoluteFilePath}`);
      // Depending on requirements, ENOENT might not be considered a throw-worthy error.
      // For now, we'll re-throw to ensure consumer nacks the message if deletion is critical.
      // If it's acceptable for a file to be already deleted, this could be changed.
      throw new Error(`File not found: ${relativeFilePath}`);
    } else {
      console.error(`Error deleting file ${absoluteFilePath}:`, error);
      throw error; // Re-throw other errors
    }
  }
}

/**
 * Deletes multiple files.
 * @param relativeFilePaths Array of paths relative to UPLOADS_DIR.
 */
export async function deleteManyFilesUtil(relativeFilePaths: string[]): Promise<void> {
  if (!relativeFilePaths || relativeFilePaths.length === 0) {
    console.warn("deleteManyFilesUtil called with no files to delete.");
    return;
  }
  console.log(`Attempting to delete ${relativeFilePaths.length} files.`);
  const results = await Promise.allSettled(
    relativeFilePaths.map(filePath => deleteFileUtil(filePath))
  );

  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.error(`Failed to delete file ${relativeFilePaths[index]}:`, result.reason);
      // If one file fails, we might want to collect all errors and throw a composite error
      // For now, the first error from deleteFileUtil would have been thrown by Promise.all if not settled.
      // Since we use allSettled, we need to check results and potentially throw if any failed.
    }
  });

  // Check if any promise was rejected and if so, throw an error to indicate partial/total failure.
  const failedDeletions = results.filter(r => r.status === 'rejected');
  if (failedDeletions.length > 0) {
    throw new Error(`Failed to delete ${failedDeletions.length} out of ${relativeFilePaths.length} files. See logs for details.`);
  }
  console.log("All specified files processed for deletion.");
}

/**
 * Copies a file.
 * @param sourceRelativePath Source path relative to UPLOADS_DIR.
 * @param targetRelativeFolder Target folder relative to UPLOADS_DIR.
 * @param newFileName Optional new name for the copied file.
 * @returns Relative path of the newly copied file.
 */
export async function copyFileUtil(
  sourceRelativePath: string,
  targetRelativeFolder: string,
  newFileName?: string
): Promise<string> {
  const absoluteSourcePath = path.join(UPLOADS_DIR, sourceRelativePath);
  const fileName = newFileName || path.basename(sourceRelativePath);
  const absoluteTargetFolderPath = path.join(UPLOADS_DIR, targetRelativeFolder);
  const absoluteTargetPath = path.join(absoluteTargetFolderPath, fileName);

  try {
    await fs.promises.mkdir(absoluteTargetFolderPath, { recursive: true });
    await fs.promises.copyFile(absoluteSourcePath, absoluteTargetPath);
    const newRelativePath = path.join(targetRelativeFolder, fileName);
    console.log(`Successfully copied '${absoluteSourcePath}' to '${absoluteTargetPath}' (relative: ${newRelativePath})`);
    return newRelativePath;
  } catch (error: any) {
    console.error(`Error copying file from ${absoluteSourcePath} to ${absoluteTargetPath}:`, error);
    if (error.code === 'ENOENT' && error.path === absoluteSourcePath) {
        throw new Error(`Source file not found: ${sourceRelativePath}`);
    }
    throw error;
  }
}

/**
 * Moves a file.
 * @param sourceRelativePath Source path relative to UPLOADS_DIR.
 * @param targetRelativeFolder Target folder relative to UPLOADS_DIR.
 * @param newFileName Optional new name for the moved file.
 * @returns New relative path of the moved file.
 */
export async function moveFileUtil(
  sourceRelativePath: string,
  targetRelativeFolder: string,
  newFileName?: string
): Promise<string> {
  const absoluteSourcePath = path.join(UPLOADS_DIR, sourceRelativePath);
  const fileName = newFileName || path.basename(sourceRelativePath);
  const absoluteTargetFolderPath = path.join(UPLOADS_DIR, targetRelativeFolder);
  const absoluteTargetPath = path.join(absoluteTargetFolderPath, fileName);

  try {
    // For rename, the target directory must exist.
    await fs.promises.mkdir(absoluteTargetFolderPath, { recursive: true });

    // fs.promises.rename will move the file. If target is on a different partition, it might fail.
    // A more robust move would involve copy then unlink, but for now, we use rename.
    await fs.promises.rename(absoluteSourcePath, absoluteTargetPath);
    const newRelativePath = path.join(targetRelativeFolder, fileName);
    console.log(`Successfully moved '${absoluteSourcePath}' to '${absoluteTargetPath}' (relative: ${newRelativePath})`);
    return newRelativePath;
  } catch (error: any) {
    console.error(`Error moving file from ${absoluteSourcePath} to ${absoluteTargetPath}:`, error);
     if (error.code === 'ENOENT' && error.path === absoluteSourcePath) {
        throw new Error(`Source file not found for move: ${sourceRelativePath}`);
    }
    // If rename fails across devices (EXDEV), implement copy + delete
    if (error.code === 'EXDEV') {
        console.warn(`Rename failed (possibly across devices), attempting copy then delete for move operation.`);
        const copiedRelativePath = await copyFileUtil(sourceRelativePath, targetRelativeFolder, newFileName);
        await deleteFileUtil(sourceRelativePath); // Delete the original file
        console.log(`Successfully moved '${sourceRelativePath}' to '${copiedRelativePath}' using copy-delete due to EXDEV.`);
        return copiedRelativePath;
    }
    throw error;
  }
}
