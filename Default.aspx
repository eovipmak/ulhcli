<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Hello Vinahost</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet">
    <style type="text/css">
        body {
            font-family: 'Montserrat', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 0;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .container {
            text-align: center;
        }
        .greeting {
            font-size: 4.5rem;
            font-weight: 700;
            color: white;
            text-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
            animation: pulse 2s infinite;
            letter-spacing: 2px;
            margin: 0;
            padding: 20px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255, 255, 255, 0.2);
            transform: perspective(1000px) rotateX(5deg);
            transition: all 0.3s ease;
        }
        .greeting:hover {
            transform: perspective(1000px) rotateX(0deg) scale(1.05);
            text-shadow: 0 12px 20px rgba(0, 0, 0, 0.5);
        }
        @keyframes pulse {
            0% {
                transform: perspective(1000px) rotateX(5deg) scale(1);
            }
            50% {
                transform: perspective(1000px) rotateX(5deg) scale(1.05);
            }
            100% {
                transform: perspective(1000px) rotateX(5deg) scale(1);
            }
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div class="container">
            <h1 class="greeting">Hello Vinahost</h1>
        </div>
    </form>
</body>
</html>