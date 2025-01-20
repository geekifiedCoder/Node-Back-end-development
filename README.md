# Node-Back-end-development

### course contents
- #### [difference between Node.js and JavaSacript(Js)](HowItWorks/1.NodeJsVsJs.md)
- #### [Common protocols in web development](HowItWorks/2.CommonWebProtocals.md)
- #### [Types of modules](HowItWorks/3.NodeJsModules.md)

### Node package and there purpose
- #### [All node.js package related to web development](HowItWorks/4.PackagesRelatedToWebDevelopment.md)

### project setup and start

#### 1.initial Setup
Creating a simple HTTPS localhost API using Node.js and Express involves the following steps:

---

#### **1. Set Up a Node.js Project**
1. Create a project folder:
   ```bash
   mkdir directory_name
   cd directory_name
   ```
2. Initialize a new Node.js project:
   ```bash
   yarn init -y
   ```
3. create and add files in .gitignore:
    ```bash
    touch .gitignore
    ```
    ```bash
    echo "**/node_modules/
    **/*.key
    **/*.cert" >> .gitignore
    ```
4. Install Express and other required packages:
   ```bash
   yarn add express
   ```
---

#### **2. Generate SSL Certificates**
For HTTPS, you'll need an SSL certificate and key. For local development, you can generate self-signed certificates:

1. Use `openssl` to generate a key and certificate:
   ```bash
   openssl req -nodes -new -x509 -keyout server.key -out server.cert -days 365
   ```
   - When prompted, you can provide dummy values for information like country, state, and organization since it's for local development.

   This will create:
   - `server.key`: The private key.
   - `server.cert`: The certificate.

---

#### **3. Create the API Code**
1. Create a file named `server.js`:
   ```bash
   touch server.js
   ```

2. Add the following code to `server.js`:

   ```javascript
   const express = require("express");
   const https = require("https");
   const fs = require("fs");
   const path = require("path");

   // Load SSL certificates
   const key = fs.readFileSync(path.resolve(__dirname, "server.key"));
   const cert = fs.readFileSync(path.resolve(__dirname, "server.cert"));

   // Create an Express app
   const app = express();

   // Middleware to parse JSON
   app.use(express.json());

   // Example API endpoint
   app.get("/", (req, res) => {
       res.send("Welcome to the HTTPS API!");
   });

   app.get("/api/data", (req, res) => {
       res.json({ message: "Secure data response", data: [1, 2, 3, 4] });
   });

   // Create an HTTPS server
   const httpsServer = https.createServer({ key, cert }, app);

   // Start the server
   const PORT = 8443;
   httpsServer.listen(PORT, () => {
       console.log(`HTTPS Server running on https://localhost:${PORT}`);
   });
   ```

---

#### **4. Run the API**
Run the server using Node.js:
```bash
node server.js
```

---

#### **5. Access the API**
- Open a browser or a tool like Postman and navigate to:
  - [https://localhost:8443](https://localhost:8443)
  - [https://localhost:8443/api/data](https://localhost:8443/api/data)

- If you’re using a browser, it might warn you about the certificate being untrusted (since it’s self-signed). You can safely bypass this warning for local development.

---

#### **6. Optional: Ignore Self-Signed Certificate Warnings**
If you're using tools like `axios` or `fetch`, you might encounter SSL validation errors. To bypass them during local development:
- Add this line to your `server.js`:
  ```javascript
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  ```

---

### **Example Output**
- Accessing `https://localhost:8443/` returns:
  ```
  Welcome to the HTTPS API!
  ```

- Accessing `https://localhost:8443/api/data` returns:
  ```json
  {
      "message": "Secure data response",
      "data": [1, 2, 3, 4]
  }
  ```

Would you like help testing or extending this API?