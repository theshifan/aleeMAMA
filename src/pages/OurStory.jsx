import { useEffect, useRef, useState } from "react";

function AnimatedSection({ children, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // Trigger once
          }
        });
      },
      { threshold: 0.15 } // Triggers when 15% of section is in view
    );

    const { current } = domRef;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0px)" : "translateY(30px)",
        transition: `opacity 0.8s ease-out ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

export default function OurStory() {
  return (
    <div style={{
      padding: "40px 24px",
      maxWidth: 700,
      margin: "0 auto",
      fontFamily: "'Nunito', 'Comic Sans MS', cursive",
      color: "#3a1a0a",
      lineHeight: 1.8,
    }}>

      {/* ── SECTION 1: It Started With a Grandmother ── */}
      <AnimatedSection>
        <h2 style={headingStyle}>
          It Started With a Grandmother Who Said "No."
        </h2>

        <p style={paraStyle}>
          When a grandmother picked up a jar of baby food from the store and read the label sugar, preservatives,
          ingredients she couldn't even pronounce she knew something was wrong.
        </p>
        <p style={centreStyle}>"I wouldn't feed this to my grandchild," she said.</p>
        <p style={centreStyle}>So she did what grandmothers do best. She made it herself.</p>
        <p style={paraStyle}>
          Real apples. Real carrots. Real grains. Carefully dehydrated, ground into fine powder, and packed with the
          same love she'd put into every meal she'd ever made for her family.
        </p>
        <p style={centreStyle}>No shortcuts. No chemicals. No compromises.</p>
        <p style={centreStyle}>Just pure, natural nutrition the way food was meant to be.</p>
        <p style={centreStyle}><strong>That's How aleeMAMA Was Born.</strong></p>

        <p style={paraStyle}>
          We're not a factory. We're not mass producing thousands of units a day.
          We're a home grown brand, making small batches in our own space, with the same care and attention a
          grandmother would give her own family. Every jar is made fresh. Every ingredient is real.
        </p>

        <p style={centreStyle}>
          Every product meets one simple standard: Would we feed this to our own children?
        </p>
        <p style={centreStyle}>If the answer is no, it doesn't leave our kitchen.</p>
      </AnimatedSection>

      <div style={dividerStyle} />

      {/* ── SECTION 2: Why We Do This ── */}
      <AnimatedSection>
        <h2 style={headingStyle}>Why We Do This</h2>

        <p style={paraStyle}>
          Because somewhere along the way, "healthy food" became full of sugar, preservatives, and artificial flavors.
          Baby food that isn't really food. Juices with more chemicals than fruit. "Natural" products that are anything but.
        </p>
        <p style={centreStyle}>We believe your family deserves better.</p>
        <p style={centreStyle}>Real ingredients. Real nutrition. Real care.</p>
        <p style={centreStyle}>No added sugar. No preservatives. No artificial anything.</p>
        <p style={centreStyle}>Just food the way nature intended and the way your grandmother would approve.</p>
      </AnimatedSection>

      <div style={dividerStyle} />

      {/* ── SECTION 3: Our Promise ── */}
      <AnimatedSection>
        <h2 style={headingStyle}>Our Promise to You</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, margin: "16px 0" }}>
          {[
            ["100% Natural Ingredients", "If it didn't grow from the earth, it's not in our products."],
            ["Small Batch Production", "We make limited quantities so every jar gets maximum attention."],
            ["No Preservatives or Additives", "Just pure, dehydrated fruits, vegetables, and grains."],
            ["Grandmother's Standards", "Every product is made with the care we'd give our own family."],
            ["Transparency", "You'll always know exactly what's in your jar. No hidden ingredients. No surprises."],
          ].map(([title, desc], i) => (
            <AnimatedSection key={i} delay={i * 100}>
              <p style={paraStyle}>
                <strong>{title}</strong> — {desc}
              </p>
            </AnimatedSection>
          ))}
        </div>
      </AnimatedSection>

      <div style={dividerStyle} />

      {/* ── SECTION 4: From Our Kitchen ── */}
      <AnimatedSection>
        <h2 style={headingStyle}>From Our Kitchen to Your Family</h2>

        <p style={paraStyle}>
          Whether you're a new mom looking for pure nutrition for your baby, someone seeking natural alternatives to
          sugary drinks, or a family that values real, wholesome food we're here for you.
        </p>
        <p style={centreStyle}>
          Every spoonful of aleeMAMA is a promise: real food, made with real care, for real health.
        </p>
        <p style={centreStyle}>
          Because your baby isn't mass produced. Their food shouldn't be either.
        </p>
        <p style={{ ...centreStyle, fontWeight: 800, fontSize: "1.1rem", marginTop: 8 }}>
          Welcome to the aleeMAMA family.
        </p>
      </AnimatedSection>

      <div style={{ height: 160 }} />
    </div>
  );
}

// ── SHARED STYLES ──
const headingStyle = {
  fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
  fontWeight: 900,
  color: "#5a2a1a",
  textAlign: "center",
  margin: "24px 0 12px",
  fontFamily: "'Nunito', 'Comic Sans MS', cursive",
};

const paraStyle = {
  fontSize: "clamp(0.85rem, 2.2vw, 1rem)",
  textAlign: "center",
  margin: "6px 0",
  color: "#5a2a1a",
};

const centreStyle = {
  ...paraStyle,
  textAlign: "center",
};

const dividerStyle = {
  margin: "28px auto",
  width: "60%",
  height: 2,
  background: "#f5d533",
  borderRadius: 2,
};