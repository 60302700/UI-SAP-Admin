import type { Metadata } from "next";
import RfqAdminDashboard from "@/components/rfq-admin/RfqAdminDashboard";

export const metadata: Metadata = {
  title: "RFQ Operations | EBITA",
  description: "Tenant RFQ approvals and SAP integration operations",
};

export default function AdminDashboard() {
  return <RfqAdminDashboard />;
}
