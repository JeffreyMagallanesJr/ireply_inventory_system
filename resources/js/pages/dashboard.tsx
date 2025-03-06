import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
];

export default function Dashboard() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex flex-col p-4">


        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <Card title="Total Number of Equipment" value="357" color="bg-yellow-500" icon="👜" />
          <Card title="Number of Equipment On Stock" value="237" color="bg-green-500" icon="📦" />
          <Card title="Number of Equipment Borrowed" value="120" color="bg-blue-500" icon="🔄" />
          <Card title="Unreturned Items past Due Date" value="10" color="bg-red-500" icon="⚠️" />
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Dropdown label="NUMBER OF ITEMS" />
          <Dropdown label="RECENT BORROWERS" />
        </div>

    
      </div>
    </AppLayout>
  );
}

/* Card Component */
function Card({ title, value, color, icon }) {
  return (
    <div className={`${color} text-white p-4 rounded-lg shadow-lg flex items-center`}>
      <span className="text-4xl">{icon}</span>
      <div className="ml-4">
        <p className="text-sm">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

/* Dropdown Component */
function Dropdown({ label }) {
  return (
    <div className="border p-2 rounded-md flex justify-between items-center bg-white shadow-sm">
      <span className="font-semibold">{label}</span>
      <select className="border-none outline-none bg-transparent">
        <option>Option 1</option>
        <option>Option 2</option>
      </select>
    </div>
  );
}
