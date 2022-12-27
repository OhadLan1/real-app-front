const Footer = () => {
  return (
    <p className="border-top py-1 text-center">
      <span>
        Real <i className="bi bi-geo-fill"></i> App
      </span>
      <span className="mx-2">&copy;</span>
      <span>{new Date().getFullYear()}</span>
    </p>
  );
};
export default Footer;
