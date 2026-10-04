import Script from "next/script";
import { dmca } from "@/data/site";
import DmcaBadge from "@/components/ui/DmcaBadge";
import Icon from "@/components/ui/Icon";
import { buildMetadata } from "@/lib/seo";
import { Reveal, RevealText } from "@/components/motion/Reveal";

export const metadata = buildMetadata({
  title: "Copyright Notice",
  description:
    "Copyright notice for The Creative Factory: who owns our designs, animations, films and project files, and how to request permission to use them.",
  path: "/copyright",
});

export default function CopyrightPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <RevealText as="h1" display>
          Copyright Notice
        </RevealText>
      </div>

      <Reveal className="page-card">
        <h2>
          <Icon name="shield" /> Intellectual Property Rights
        </h2>

        <p>
          All content and project files, including but not limited to compositions, animations, designs, assets, source
          files, scripts, expressions, visual elements, and any associated materials, is the{" "}
          <span className="highlight">exclusive intellectual property of CHANDUPA SANHITHA WEERAKKODY</span>, operating
          under <span className="highlight">TheCreativeFactory</span>.
        </p>

        <Reveal variant="copy" className="notice-section">
          <h3>
            <Icon name="lock" /> Legal Protection
          </h3>
          <p>
            This material is protected under applicable copyright and intellectual property laws in accordance with
            international treaties and domestic legislation. All rights are reserved and enforced to the fullest extent
            permitted by law.
          </p>
        </Reveal>

        <DmcaBadge size="large" />

        <p>
          No part of this project may be copied, reproduced, modified, reverse engineered, distributed, transmitted,
          displayed, sold, licensed, or used in any form or by any means without{" "}
          <span className="highlight">prior written permission</span> from CHANDUPA SANHITHA WEERAKKODY.
        </p>

        <Reveal variant="copy" className="notice-section">
          <h3>
            <Icon name="warning" /> Unauthorized Use
          </h3>
          <p>
            Unauthorized use, duplication, or distribution of this material will result in{" "}
            <span className="highlight">legal action</span>. This includes but is not limited to civil litigation,
            injunctive relief, and recovery of damages as permitted under applicable law.
          </p>
        </Reveal>

        <Reveal variant="copy" className="notice-section">
          <h3>
            <Icon name="copyright" /> All Rights Reserved
          </h3>
          <p>
            © 2026 CHANDUPA SANHITHA WEERAKKODY. All Rights Reserved. TheCreativeFactory is a company presently
            undergoing formal registration in Sri Lanka and is owned and operated by CHANDUPA SANHITHA WEERAKKODY.
          </p>
        </Reveal>

        <p className="legal-text">
          <strong>
            For inquiries regarding licensing, permissions, or usage rights, please contact us directly through our
            official channels.
          </strong>
        </p>
      </Reveal>

      {/* DMCA.com badge helper, as on the legacy page. */}
      <Script src={dmca.helperScript} strategy="afterInteractive" />
    </div>
  );
}
