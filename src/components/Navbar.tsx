import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

const notifications = [
  {
    id: 1,
    title: "Payment Reminder",
    message: "Credit card payment due in 3 days",
    time: "2 hours ago",
    type: "warning"
  },
  {
    id: 2,
    title: "Investment Update",
    message: "Your portfolio gained 2.5% this week",
    time: "1 day ago",
    type: "success"
  },
  {
    id: 3,
    title: "Loan EMI",
    message: "Monthly EMI deducted successfully",
    time: "3 days ago",
    type: "info"
  }
];

export function Navbar() {
  const handleSync = () => {
    // Sync functionality
    alert("Data synced successfully!");
  };

  const handleProfile = () => {
    // Navigate to profile
    window.location.href = "/profile";
  };

  const handleLogout = () => {
    // Logout functionality
    window.location.href = "/";
  };

  return (
    <nav className="h-16 border-b bg-card flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold text-foreground">
          Financial Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {notifications.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <h4 className="font-semibold">Notifications</h4>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="p-3 rounded-lg border bg-card/50"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h5 className="font-medium text-sm">{notification.title}</h5>
                      <span className="text-xs text-muted-foreground">
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {notification.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Profile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-muted-foreground">john.doe@example.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleProfile}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSync}>
              Sync Data
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}