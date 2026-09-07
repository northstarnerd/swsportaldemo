export interface ServiceItem {
  id: string;
  name: string;
  category: "trash" | "recycle" | "organics" | "yard_waste" | "bulky";
  size: string;
  frequency: string;
  nextScheduledDate: string;
  nextScheduledDay: string;
  iconType: "trash" | "recycle" | "leaf" | "box";
  badgeColor: string;
}

export interface ServiceHistoryItem {
  id: string;
  serviceId: string;
  date: string;
  day: string;
  serviceName: string;
  status: "Completed" | "Scheduled" | "In Progress";
  time?: string;
}

export type AutoPayScheduleType = "due_date" | "statement_issue" | "custom_day" | "days_before";

export interface CustomerAccount {
  accountNumber: string;
  customerName: string;
  email: string;
  phone: string;
  serviceAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    locationId: string;
  };
  billing: {
    totalDue: number;
    pastDue: number;
    dueDate: string;
    status: "Past Due" | "Current" | "Paid";
    autoPay: {
      enabled: boolean;
      scheduleType: AutoPayScheduleType;
      customDay?: number;
      daysBefore?: number;
      cardBrand: "Mastercard" | "Visa" | "Amex" | "Discover" | "Apple Pay" | "Google Pay";
      last4: string;
      expDate: string;
      notifyBeforeDays: number;
      statusNote: string;
      failedReason?: string;
    };
  };
  services: ServiceItem[];
  recentHistory: ServiceHistoryItem[];
}

export const INITIAL_ACCOUNT_DATA: CustomerAccount = {
  accountNumber: "89545",
  customerName: "Patrick Badley",
  email: "patrickbadley@gmail.com",
  phone: "(612) 555-0192",
  serviceAddress: {
    locationId: "895450001",
    street: "6484 Promontory Drive",
    city: "Eden Prairie",
    state: "MN",
    zip: "55346",
  },
  billing: {
    totalDue: 126.93,
    pastDue: 126.93,
    dueDate: "August 25, 2026",
    status: "Past Due",
    autoPay: {
      enabled: true,
      scheduleType: "due_date",
      customDay: 15,
      daysBefore: 3,
      cardBrand: "Mastercard",
      last4: "4714",
      expDate: "04/32",
      notifyBeforeDays: 3,
      statusNote: "Auto-pay attempt failed on Aug 15. Action required to prevent service disruption.",
      failedReason: "Card processor transaction error in legacy portal",
    },
  },
  services: [
    {
      id: "srv-organics",
      name: "Residential Organics",
      category: "organics",
      size: "35 Gallon Cart",
      frequency: "Weekly",
      nextScheduledDate: "Thu, August 27",
      nextScheduledDay: "Thursday",
      iconType: "leaf",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      id: "srv-trash",
      name: "Residential Trash",
      category: "trash",
      size: "96 Gallon Cart",
      frequency: "Weekly",
      nextScheduledDate: "Thu, August 27",
      nextScheduledDay: "Thursday",
      iconType: "trash",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      id: "srv-recycle",
      name: "Residential Single-Stream Recycling",
      category: "recycle",
      size: "96 Gallon Cart",
      frequency: "Every 2 Weeks",
      nextScheduledDate: "Thu, September 3",
      nextScheduledDay: "Thursday",
      iconType: "recycle",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    },
  ],
  recentHistory: [
    {
      id: "hist-1",
      serviceId: "8743058",
      date: "Thu, Aug 27, 2026",
      day: "Thursday",
      serviceName: "35 Qtrly Resi Organics",
      status: "Scheduled",
    },
    {
      id: "hist-2",
      serviceId: "8743059",
      date: "Thu, Aug 27, 2026",
      day: "Thursday",
      serviceName: "96 Qtrly Resi Trash",
      status: "Scheduled",
    },
    {
      id: "hist-3",
      serviceId: "8638333",
      date: "Thu, Aug 20, 2026",
      day: "Thursday",
      serviceName: "96 Qtrly Resi Recycle",
      status: "Completed",
      time: "7:42 AM",
    },
    {
      id: "hist-4",
      serviceId: "8638438",
      date: "Thu, Aug 20, 2026",
      day: "Thursday",
      serviceName: "96 Qtrly Resi Trash",
      status: "Completed",
      time: "7:45 AM",
    },
    {
      id: "hist-5",
      serviceId: "8638623",
      date: "Thu, Aug 20, 2026",
      day: "Thursday",
      serviceName: "35 Qtrly Resi Organics",
      status: "Completed",
      time: "8:10 AM",
    },
    {
      id: "hist-6",
      serviceId: "8539530",
      date: "Thu, Aug 13, 2026",
      day: "Thursday",
      serviceName: "35 Qtrly Resi Organics",
      status: "Completed",
      time: "8:05 AM",
    },
  ],
};
