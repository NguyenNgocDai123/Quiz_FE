import { UserRole } from "@/enums/Roles";

export interface UserInfo {
  id: string;
  full_name: string;
  email: string;
  created_at: string;
  role: UserRole;
  is_active: boolean;
}
