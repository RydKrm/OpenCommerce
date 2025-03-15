#### API documentation

## User Profile Routes

- POST : ${base_url}/api/v1/user/profile/login
  Body parameters {email: string, password: string}
- POST : ${base_url}/api/v1/user/profile/register
- Body parameters
  {
  name: string,
  email: string,
  password: string,
  phone_number:string
  }
- GET : ${base_url}/api/v1/user/profile/all
- GET : ${base_url}/api/v1/user/profile/:id
- PATCH : ${base_url}/api/v1/user/profile/:id
- DELETE : ${base_url}/api/v1/user/profile/:id

## Seller Profile Router

- POST : ${base_url}/api/v1/seller/profile/login
  Body parameters {email: string, password: string}
- POST : ${base_url}/api/v1/seller/profile/register
- Body parameters
  {
  name: string,
  email: string,
  password: string,
  phone_number:string
  }
- GET : ${base_url}/api/v1/seller/profile/all
- GET : ${base_url}/api/v1/seller/profile/:id
- PATCH : ${base_url}/api/v1/seller/profile/:id
- DELETE : ${base_url}/api/v1/seller/profile/:id
- PATCH : {$base_url}/api/v1/seller/profile/updatePassword/:id
  {old_password:string, new_password:string}
- POST : ${base_url}/api/v1/seller/profile/forgetPassword
  Body { email:string, role:string}

## Vendor Profile Router

- POST : ${base_url}/api/v1/vendor/profile/login
  Body parameters {email: string, password: string}
- POST : ${base_url}/api/v1/vendor/profile/register
- Body parameters
  {
  name: string,
  email: string,
  password: string,
  phoneNumber:string,
  description:string,
  address:string
  }
- GET : ${base_url}/api/v1/vendor/profile/all
- GET : ${base_url}/api/v1/vendor/profile/:id
- PATCH : ${base_url}/api/v1/vendor/profile/:id
- DELETE : ${base_url}/api/v1/vendor/profile/:id
