#Pead Pay API
**Introduction**

The Pead Pay API is a RESTful API that allows you to make and receive payments for medical services. The API uses Paystack, a Nigeria-based payment processor, to facilitate payments.

**Endpoints**

The Pead Pay API has the following endpoints:

**Payment**
The base endpoint for payments is `/api/v1/payment/`
- `/`: This endpoint is used to charge a customer's card and get payments made by a customer.
- `/paystack`: This endpoint is used to verify and complete payments using Paystack.

**User Auth**
The base endpoint for user authentication and user related activity is `/api/v1/auth/`
- `/`: This endpoint is used to get all users registered on the system.
- `/login`: This endpoint is used to login to get access to the system.
- `/signup`: This endpoint is used to register to the system.
- `/:id`: This endpoint is used to either `get` a single user or `delete` a single user.

**Request and Response Bodies**

The request and response bodies for the Pead Pay API are JSON objects. The following table shows the required and optional fields for each endpoint:

| Endpoint   | Required Fields                                                                         | Optional Fields      |
|------------|-----------------------------------------------------------------------------------------|----------------------|
| `/signup`  | `first_name`, `first_name`,`last_name`,`phone`,`email``,dob`,`house_address`,`password` | `amount`, `currency` |
| `/payment` | `amount`, `currency`, `customer_email`, `customer_name`, `description`                  | `metadata`           |
| `/login`   | `email`, `password`                                                                     | `amount`, `currency` |

**Error Codes**

The Pead Pay API returns the following error codes:

- `400`: Bad request.
- `401`: Unauthorized.
- `402`: Payment required.
- `403`: Forbidden.
- `404`: Not found.
- `500`: Internal server error.

**Examples**

The following are examples of how to use the Pead Pay API:

- To charge a customer's card:

```shell
curl -X POST https://localhost:5000/api/v1/payment \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "amount": 10000,
    "currency": "NGN",
    "customer_email": "johndoe@example.com",
    "customer_name": "John Doe",
    "description": "Payment for medical services"
  }'
```

- To refund a customer's payment:

```shell
curl -X POST https://localhost:5000/api/v1/refund \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "transaction_id": "1234567890"
  }'
```

- To verify a payment:

```shell
curl -X POST https://localhost:5000/api/v1/verify \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "transaction_id": "1234567890"
  }'
```

**Steps to Run the API Locally**

To run the Pead Pay API locally after cloning from the GitHub repository, follow these steps:

- Clone the repository:
```shell
git clone https://github.com/Davidon4/pead-pay-api.git
```
- Change to the cloned directory:
```shell
cd pead-pay-api
```
- Install the dependencies:
```shell
npm install
```
- Set up the environment variables. Create a .env file in the root directory and define the following variables:
```plaintext
PORT=3000
PAYSTACK_API_KEY=your_paystack_api_key
```
Replace your_paystack_api_key with your actual Paystack API key.

- Start the API server:
```shell
npm start
```

The API will now be running locally on http://localhost:5000.

You can use tools like cURL or API testing software to send requests to the locally running API endpoints as shown in the examples above.
For more information, raise an issue, we will respond ASAP.
