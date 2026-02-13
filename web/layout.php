<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Personal Budget Tracker</title>
    <link rel="stylesheet" href="web/style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Personal Budget Tracker</h1>
            <nav>
                <ul>
                    <li><a href="/?page=home">Home</a></li>
                    <li><a href="/?page=movements">Movimentações</a></li>
                    <li><a href="/?page=reports">Relatórios</a></li>
                </ul>
            </nav>
        </header>
        
        <main class="content">
            <?php 
            $page = $_GET['page'] ?? 'home';
            $pageFile = __DIR__ . '/' . $page . '.php';
            if (file_exists($pageFile)) {
                include $pageFile;
            } else {
                include __DIR__ . '/home.php';
            }
            ?>
        </main>
        
        <footer>
            <p>&copy; 2026 Personal Budget Tracker.</p>
        </footer>
    </div>
    
    <script src="web/script.js"></script>
</body>
</html>
