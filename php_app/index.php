<!-- php -S localhost:8000 -->
<!DOCTYPE html>
<html>
<head>
    <title><?php echo 'Anagrams'; ?></title>
</head>
<style>

    body {
        background-color: #282729;
        color: #d5d5d5;
    }

    h1 {
        width: 100%;
        text-align: center;
    }
    table {
        border-collapse: collapse;
    }

    table, th, td {
        border: 1px solid #696969;
    }

    th, td {
        padding: 8px;
        text-align: center;
    }

    th {
        font-size: 18px;
        background-color: #3e3d40;
    }

    td {
        font-size: 15px;
        vertical-align: top;
    }
</style>
<body>
<h1>Anagrams na PHP</h1>

<?php

function sortString($str) {
  $chars = str_split($str);
  sort($chars);
	return implode('', $chars);
}

function generateAnagramsFromFile() {
  $file = file_get_contents('anagrams.txt');
  $result = array();
  foreach (explode(' ', $file) as $key=>$value) {
    $sorted = sortString($value);
    $result[$sorted][] = $value;
  }

  function filterArray($value){
    return count($value) > 1;
  }

  return array_filter($result, filterArray);
}

$data = generateAnagramsFromFile();
?>
<table>
    <tr>
        <th>Word</th>
        <th>Count</th>
        <th>Anagrams</th>
    </tr>
    <?php foreach($data as $key=>$value): ?>
        <tr>
            <td>
                <?php echo $key; ?>
            </td>
            <td>
                <? echo count($value); ?>
            </td>
            <td>
                <?php echo join(', ', $value);?>
            </td>
        </tr>
    <?php endforeach; ?>
</table>
</body>
</html>
