//    http://localhost/mysite/index.php
<?php
$name = isset($_GET['name']) ? trim($_GET['name']) : '';
$time = date('Y-m-d H:i:s');
?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<title>Simple PHP Example</title>
</head>
<body>
	<h1><?php echo $name ? 'Hello, ' . htmlspecialchars($name) . '!' : 'Hello, world!'; ?></h1>
	<p>Server time: <?php echo $time; ?></p>
	<form method="get">
		<label for="name">Your name:</label>
		<input id="name" name="name" value="<?php echo htmlspecialchars($name); ?>">
		<button type="submit">Greet</button>
	</form>
</body>
</html>

