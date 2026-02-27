function GuestFooterPage() {
  return (
    <div>
      <div className="containers">
        <div className="headers">
          <p>
            <img src="./logo.png" alt="" />
          </p>
        </div>
        <div className="footer-components w-full flex justify-evenly">
          <div className="company">
            <ul>
              <li>Company</li>
              <li>About Us</li>
              <li>Jobs</li>
              <li>List out Property</li>
              <li>Partnership</li>
            </ul>
          </div>
          <div className="explore">
            <ul>
              <li>Company</li>
              <li>About Us</li>
              <li>Jobs</li>
              <li>List out Property</li>
              <ul>
                <li>Company</li>
                <li>About Us</li>
                <li>Jobs</li>
                <li>List out Property</li>
                <li>Partnership</li>
              </ul>
              <li>Partnership</li>
            </ul>
          </div>
          <div className="policies">
            <ul>
              <li>Company</li>
              <li>About Us</li>
              <li>Jobs</li>
              <li>List out Property</li>
              <li>Partnership</li>
            </ul>
          </div>
          <div className="help">
            <ul>
              <li>Company</li>
              <li>About Us</li>
              <li>Jobs</li>
              <li>List out Property</li>
              <li>Partnership</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuestFooterPage;
