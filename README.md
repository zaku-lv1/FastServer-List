# FastServer Connect - Modern Server List

![FastServer Connect](https://github.com/user-attachments/assets/4f8dbd77-cdef-4217-86f9-9825c109ba35)

A modern, beautiful, and responsive Minecraft server list application that works perfectly with GitHub Pages.

## 🌟 Features

- **GitHub Pages Compatible** - Pure static HTML/CSS/JavaScript implementation
- **Modern Design** - Beautiful gradients, animations, and modern UI components
- **Responsive Layout** - Perfect mobile and desktop experience
- **Real-time Search** - Filter servers by name, address, or MOTD
- **Advanced Filtering** - Filter by protocol (TCP/UDP) and sort by various criteria
- **Minecraft Color Support** - Full support for Minecraft color codes in MOTD
- **Clipboard Integration** - One-click server address copying
- **Interactive Stats** - Animated counters showing server statistics
- **Loading Animations** - Smooth loading experience with modern effects

## 🚀 Live Demo

Visit the live version: [FastServer Connect](https://your-username.github.io/FastServer-List/)

## 📱 Screenshots

### Desktop View
![Desktop](https://github.com/user-attachments/assets/4f8dbd77-cdef-4217-86f9-9825c109ba35)

### Mobile View
![Mobile](https://github.com/user-attachments/assets/ddfa0332-8f8d-4261-b4a5-76c15f3211e8)

## 🛠️ Setup for GitHub Pages

1. **Fork or Clone** this repository
2. **Enable GitHub Pages** in repository settings
3. **Set source** to main branch root folder
4. **Access** your deployed site at `https://your-username.github.io/FastServer-List/`

That's it! No build process required - it's pure static files.

## 🎨 Design Features

- **Modern Color Scheme** - Beautiful purple gradient theme
- **Glass Morphism** - Semi-transparent elements with backdrop blur
- **Smooth Animations** - CSS transitions and keyframe animations
- **Hover Effects** - Interactive elements with visual feedback
- **Custom Typography** - Inter font for modern readability
- **Icon Integration** - FontAwesome icons throughout the interface

## 🔧 Technical Features

- **Client-side API Integration** - Fetches data from server API using JavaScript
- **Fallback Demo Data** - Works even when API is unavailable
- **Error Handling** - Graceful error handling with user feedback
- **Performance Optimized** - Efficient rendering and minimal DOM manipulation
- **Cross-browser Compatible** - Works on all modern browsers

## 📋 API Integration

The application fetches server data from:
```
https://api.zpw.jp/connect/serverlist.php
```

The API should return data in the following format:
```json
{
  "data": [
    {
      "サーバー名": "Server Name",
      "connect_key": "server01",
      "protocol": "tcp",
      "mcinfo": {
        "version": "1.20.4",
        "players": "42",
        "motd": "§6§lWelcome to our server!",
        "favicon": "data:image/png;base64,..."
      },
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-07-17T08:45:00Z"
    }
  ]
}
```

## 🎯 Browser Support

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔄 Migration from Express.js

This project has been completely rewritten from the original Express.js version to be fully compatible with GitHub Pages:

- ✅ Converted from server-side rendering to client-side
- ✅ Replaced EJS templates with pure HTML
- ✅ Moved API calls from Node.js backend to JavaScript frontend
- ✅ Maintained all original functionality
- ✅ Added modern design and improved UX
- ✅ Enhanced mobile responsiveness

## 📞 Support

If you have any questions or need help, please open an issue or contact the maintainers.

---

**Made with ❤️ for the Minecraft community**