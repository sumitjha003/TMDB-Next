import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 2) {
      router.back(); 
    } else {
      router.push("/"); 
    }
  };

  return (
    <Button 
      className="back-button text-black! bg-white! hover:bg-gray-100! hover:text-black! border-none" 
      icon={<ArrowLeftOutlined style={{ color: "black" }} />} 
      onClick={handleBack}
    >
      Back
    </Button>
  );
};

export default BackButton;