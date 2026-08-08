import aleemamaImg from '../assets/aleemama_face.png';

export default function ContactUs() {
  return (
    <div className="contact-wrapper" style={{
      position: "relative",
      width: "100%",
      minHeight: "100vh",
      background: "#ffffff",
      fontFamily: "'Nunito', 'Comic Sans MS', cursive",
      boxSizing: "border-box",
    }}>
      <style>{`
        /* ── INTERACTIVE BUTTON STYLES ── */
        .contact-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: #ffffff;
          border: 3.5px solid #5a2a1a;
          border-radius: 20px;
          padding: 12px 28px;
          margin-bottom: 20px;
          text-decoration: none;
          color: #5a2a1a;
          font-weight: 800;
          font-size: 42px;
          box-shadow: 0 8px 0px #5a2a1a;
          transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
          cursor: pointer;
          width: fit-content;
        }

        .contact-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 11px 0px #5a2a1a;
          background: #fffdf0;
        }

        .contact-btn:active {
          transform: translateY(4px);
          box-shadow: 0 4px 0px #5a2a1a;
        }

        /* ── DESKTOP DEFAULT STYLES ── */
        .contact-content-row {
          flex: 1;
          display: flex;
          flex-direction: row;
          position: relative;
          width: 100%;
        }

        .contact-left {
          flex: 1;
          padding: 28px 28px 28px 32px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }

        .contact-right {
          width: 50%;
          maxWidth: 3040px;
          flex-shrink: 0;
          position: relative;
          min-height: 400px;
        }

        .contact-img {
          position: absolute;
          bottom: 180px;
          right: 0;
          width: 100%;
          height: auto;
          object-fit: contain;
          object-position: bottom right;
        }

        /* ── TABLET STYLES (768px - 1024px) ── */
        @media (max-width: 1024px) {
          .contact-title {
            font-size: 38px !important;
          }
          .contact-btn {
            font-size: 30px !important;
            padding: 10px 22px !important;
            border-width: 3px !important;
            box-shadow: 0 6px 0px #5a2a1a !important;
          }
          .contact-icon {
            width: 48px !important;
            height: 48px !important;
          }
          .contact-img {
            bottom: 140px !important;
          }
        }

        /* ── MOBILE PHONE STYLES (< 768px) ── */
        @media (max-width: 768px) {
          .contact-wrapper {
            min-height: auto !important;
            padding: 40px 16px 80px 16px !important;
            overflow: visible !important;
          }

          .contact-main-area {
            position: relative !important;
            top: 0 !important;
            inset: auto !important;
          }

          .contact-content-row {
            flex-direction: column !important;
            align-items: center !important;
          }

          .contact-left {
            padding: 0 !important;
            align-items: center !important;
            width: 100% !important;
            margin-bottom: 80px !important;
          }

          .contact-title {
            font-size: 32px !important;
            text-align: center !important;
          }

          .contact-dashed-line {
            width: 100% !important;
            max-width: 260px !important;
            margin: 12px 0 20px 0 !important;
          }

          .contact-btn {
            font-size: 18px !important;
            padding: 8px 18px !important;
            border-width: 2.5px !important;
            border-radius: 14px !important;
            box-shadow: 0 5px 0px #5a2a1a !important;
            gap: 8px !important;
            margin-bottom: 16px !important;
          }

          .contact-icon {
            width: 28px !important;
            height: 28px !important;
          }

          .contact-divider-v {
            display: none !important;
          }

          .contact-right {
            width: 100% !important;
            min-height: auto !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            position: relative !important;
            margin-top: -15px !important;
          }

          .contact-img {
            position: relative !important;
            bottom: 70px !important;
            right: auto !important;
            width: 80% !important;
            max-width: 230px !important;
            height: auto !important;
            display: block !important;
          }
        }
      `}</style>

      {/* ── MAIN AREA ── */}
      <div className="contact-main-area" style={{
        position: "absolute",
        top: 64, left: 0, right: 0, bottom: 0,
        display: "flex",
        flexDirection: "column",
      }}>

        {/* ── CONTENT ROW ── */}
        <div className="contact-content-row">

          {/* LEFT: Contact info */}
          <div className="contact-left">

            {/* Title */}
            <h1 className="contact-title" style={{
              fontSize: 50,
              fontWeight: 900,
              color: "#5a2a1a",
              margin: "0 0 6px 0",
              textAlign: "left",
              fontFamily: "'Nunito', 'Comic Sans MS', cursive",
            }}>
              Contact Us
            </h1>

            {/* Dashed underline */}
            <svg className="contact-dashed-line" width="400" height="12" style={{ marginBottom: 24, marginTop: 24 }}>
              <line x1="0" y1="6" x2="2000" y2="6"
                stroke="#5a2a1a" strokeWidth="6.5"
                strokeDasharray="10,7" strokeLinecap="round" />
            </svg>

            {/* 💬 WHATSAPP BUTTON (Direct link to WhatsApp Chat) */}
            <a 
              href="https://wa.me/919961561514" 
              target="_blank" 
              rel="noreferrer" 
              className="contact-btn"
            >
              <svg className="contact-icon" width="60" height="60" viewBox="0 0 24 24" fill="none"
                stroke="#5a2a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
              <span>: +91 9961561514</span>
            </a>

            {/* 📞 PHONE CALL BUTTON */}
            <a 
              href="tel:+918714431636" 
              className="contact-btn"
            >
              <svg className="contact-icon" width="60" height="60" viewBox="0 0 24 24" fill="none"
                stroke="#5a2a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.47 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>: +91 8714431636</span>
            </a>

          </div>

          {/* RIGHT: Grandma Illustration */}
          <div className="contact-right">
            {/* Vertical divider */}
            <div className="contact-divider-v" style={{
              position: "absolute",
              left: 0, top: 0, bottom: 0,
              width: 9.5,
              background: "#f5d533",
            }} />
            
            {/* Grandma image */}
            <img
              src={aleemamaImg}
              alt="aleeMAMA"
              className="contact-img"
            />
          </div>

        </div>
      </div>
    </div>
  );
}