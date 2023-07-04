#Pead Pay API
**Introduction**

The Pead Pay API is a RESTful API that allows you to make and receive payments for medical services. The API uses Paystack, a Nigeria-based payment processor, to facilitate payments.

**Endpoints**

The Pead Pay API has the following endpoints:

- `/charge`: This endpoint is used to charge a customer's card.
- `/refund`: This endpoint is used to refund a customer's payment.
- `/verify`: This endpoint is used to verify a payment.

**Request and Response Bodies**

The request and response bodies for the Pead Pay API are JSON objects. The following table shows the required and optional fields for each endpoint:

| Endpoint   | Required Fields                            | Optional Fields |
|------------|--------------------------------------------|-----------------|
| `/charge`  | `amount`, `currency`, `customer_email`, `customer_name`, `description` | `metadata`      |
| `/refund`  | `transaction_id`                           | `amount`, `currency`      |
| `/verify`  | `transaction_id`                           | `amount`, `currency`      |

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
curl -X POST https://localhost:5000/api/v1/charge \
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

For more information, raise an issue, we will respond ASAP.
