## 🔔 Notification System

### 🔔 Types of Notifications

- In-App Notifications
- Push Notifications
- Email Notifications
- SMS (optional)

📩 Notification Triggers
| Event | Channel |
| --------------------------------- | ------------- |
| New message | In-app, push |
| Order shipped | Email, in-app |
| Product price drop (wishlist) | In-app, push |
| Order cancelled / refunded | Email, in-app |
| Admin replies to a support ticket | Email, in-app |
| New comment on a product | In-app |

### 🛠️ Core Notification Features

| Feature                     | Description                                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------------- |
| ✅ Notification Service     | Central service to create, store, and broadcast notifications                                                 |
| ✅ Real-time Delivery       | Send instantly using WebSocket or push service                                                                |
| ✅ Notification Center UI   | Show bell icon, unread count, dropdown list of recent notifications                                           |
| ✅ Read/Unread State        | Store read status in DB, toggle when opened                                                                   |
| ✅ Push Notifications       | Use [Firebase Cloud Messaging (FCM)](https://firebase.google.com/products/cloud-messaging) or service workers |
| ✅ Notification Preferences | Let users choose what to be notified for                                                                      |
