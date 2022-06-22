class Footer {
  render() {
    const html = `
      <div class="footer-container">
         <div class="footer-title">Sushi - 2022 &#169;</div>
      </div>
      `;
    ROOT_FOOTER.innerHTML = html;
  }
}
const footerPage = new Footer();
footerPage.render();
