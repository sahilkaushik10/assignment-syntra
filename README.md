# Campaign Backend API

A backend platform build with **NODE.js** to upload and asynchronously process campaign data with queue support


# Features

- upload campaign JSON or text files
- Asynchronous queue-based processing
- JWT-based authetication
- Stores results in mongoDB
- Retry failed campaigns
- RESt APIs (build with Express)


# Stack

**Backend:** Node.js + Express.js
**Queue:** In-Memory (can switch to BullMq, Redis, SQS...etc)
**DB:** MongoDB (Mongooose)
**Auth:** Custom JWT Middleware
**Upload:** `multer` (multipart/form-data support)



# API Endpoints

POST ---- `/campaign/upload`
GET ----- `campaign/status:id`
GET ----- `campaign/summary:id`
POST ----- `campaign/retry:id`