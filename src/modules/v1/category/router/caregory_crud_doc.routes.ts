/**
 * @swagger
 * /v1/category/crud/all:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of all categories
 */
/**
 * @swagger
 * /v1/category/crud/single/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category details
 *       404:
 *         description: Category not found
 */

/**
 * @swagger
 * /v1/category/crud/create:
 *   post:
 *     summary: Create a new category
 *     tags:
 *       - Categories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the category
 *               parentId:
 *                 type: integer
 *                 description: Parent category ID
 *     responses:
 *       200:
 *         description: The category was successfully created
 *       400:
 *         description: Invalid category
 */

/**
 * @swagger
 * /api/admin/register:
 *   post:
 *     summary: Create Admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Admin name
 *               email:
 *                 type: string
 *                 description: Admin email
 *               phone_number:
 *                 type: string
 *                 description: Admin phone number
 *     responses:
 *       200:
 *         description: Admin created successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Admin Login
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/admin/update/{id}:
 *   patch:
 *     summary: Update Admin Profile
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Admin ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Admin updated successfully
 *       404:
 *         description: Admin not found
 */

/**
 * @swagger
 * /api/admin/single/{id}:
 *   get:
 *     summary: Get Single Admin
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Admin ID
 *     responses:
 *       200:
 *         description: Admin details
 *       404:
 *         description: Admin not found
 */

/**
 * @swagger
 * /api/admin/allAdmin:
 *   get:
 *     summary: Get All Admins
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of all admins
 */

/**
 * @swagger
 * /api/company/create:
 *   post:
 *     summary: Create Company
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Company created successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /api/company/update/{id}:
 *   patch:
 *     summary: Update Company
 *     tags: [Company]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Company updated successfully
 *       404:
 *         description: Company not found
 */

/**
 * @swagger
 * /api/company/all:
 *   get:
 *     summary: Get All Companies
 *     tags: [Company]
 *     responses:
 *       200:
 *         description: List of companies
 */

/**
 * @swagger
 * /api/manager/register:
 *   post:
 *     summary: Register Manager
 *     tags: [Manager]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               companyID:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Manager registered successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /api/manager/login:
 *   post:
 *     summary: Manager Login
 *     tags: [Manager]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/manager/single/{id}:
 *   get:
 *     summary: Get Single Manager
 *     tags: [Manager]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Manager ID
 *     responses:
 *       200:
 *         description: Manager details
 *       404:
 *         description: Manager not found
 */

/**
 * @swagger
 * /api/counselor/register:
 *   post:
 *     summary: Register Counselor
 *     tags: [Counselor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               company_id:
 *                 type: integer
 *               manager_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Counselor registered successfully
 *       400:
 *         description: Invalid input
 */
