const form = document.querySelector('form');
const convertBtn = document.querySelector('#convert-btn');

convertBtn.addEventListener('click', () => {
  const fileInput = document.querySelector('#word-file');
  const formData = new FormData();

  if (fileInput.files.length === 0) {
    alert('Please select a Word file');
    return;
  }

  formData.append('word-file', fileInput.files[0]);

  fetch('convert.php', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (response.ok) {
      return response.blob();
    } else {
      throw new Error('Error converting Word to PDF');
    }
  })
  .then(blob => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'converted.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
  })
  .catch(error => {
    console.error(error);
    alert('Error converting Word to PDF');
  });
});
