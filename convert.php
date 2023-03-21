<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['word-file'])) {
  $wordFile = $_FILES['word-file']['tmp_name'];
  $pdfFile = 'converted.pdf';
  $command = 'libreoffice --headless --convert-to pdf --outdir . ' . $wordFile;

  exec($command);

  header('Content-Type: application/pdf');
  header('Content-Disposition: attachment; filename="'.$pdfFile.'"');
  readfile($pdfFile);
  unlink($pdfFile);
} else {
  http_response_code(400);
}
?>
