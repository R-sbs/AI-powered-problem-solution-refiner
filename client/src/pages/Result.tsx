import { useLocation, useNavigate } from "react-router";
import { Button, Typography, Space, message } from "antd";
import {
  DownloadOutlined,
  ShareAltOutlined,
  ArrowLeftOutlined,
  CopyOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p style={{ padding: 24 }}>No data found. Go back.</p>;

  const { improvedProblem, improvedSolution, perspective } = state;

  const content = `Predict Growth\n\nPerspective: ${perspective}\n\nImproved Problem:\n${improvedProblem}\n\nImproved Solution:\n${improvedSolution}`;

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `RefinedStatements-${perspective}.txt`;
    link.click();
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Refined Problem & Solution",
          text: content,
        });
      } else {
        await navigator.clipboard.writeText(content);
        message.success("Copied to clipboard!");
      }
    } catch (err) {
      console.error("Share failed:", err);
      message.error("Unable to share.");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      message.success("Copied to clipboard!");
    } catch (err) {
      console.error("Copy failed:", err);
      message.error("Unable to copy.");
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 24 }}>
      <div className="w-full flex align-center">
        <Title level={3}>Final Refined View</Title>
      </div>

      <div className="bg-white p-8 rounded-2xl text-base">
        <Paragraph className="text-left">
          <Text strong>Perspective:</Text> {perspective.toUpperCase()}
        </Paragraph>

        <Paragraph className="text-left">
          <Text strong>Improved Problem:</Text>
          <br />
          {improvedProblem}
        </Paragraph>

        <Paragraph className="text-left">
          <Text strong>Improved Solution:</Text>
          <br />
          {improvedSolution}
        </Paragraph>
      </div>

      <Space style={{ marginTop: 24 }} wrap>
        <Button
          type="primary"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/")}
        >
          Back to Edit
        </Button>
        <Button icon={<DownloadOutlined />} onClick={handleDownload}>
          Download
        </Button>
        <Button icon={<CopyOutlined />} onClick={handleCopy}>
          Copy
        </Button>
        <Button icon={<ShareAltOutlined />} onClick={handleShare}>
          Share
        </Button>
      </Space>
    </div>
  );
}
