function generateFileListContent(fileList) {
  var htmlContent = '';
  fileList.forEach(element => {
    var url = element.url;
    var filename = element.fileName;
    var htmlTemp = `< a href="${url}"><li>${filename}</li></ a></br>`;
    htmlContent = htmlContent + htmlTemp;
  });
  return htmlContent
}

module.exports = {
  generateFileListContent
}