import { Flag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReportButtonProps {
    email?: string;
    subject?: string;
}

export function ReportButton({ 
    email = "admin@pawsit.com",
    subject = "Pawsit Report"
}: ReportButtonProps) {
    const handleClick = () => {
        // Gmail compose URL
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}`;
        window.open(gmailUrl, "_blank");
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={handleClick}
            className="text-orange-500 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950/20 gap-1.5"
        >
            <Flag className="w-4 h-4" />
            <span className="hidden sm:inline text-xs font-medium">Report</span>
        </Button>
    );
}
