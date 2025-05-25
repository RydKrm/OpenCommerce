"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  CreditCard,
  DollarSign,
  AlertCircle,
  CheckCircle,
  RefreshCw,
} from "lucide-react";

const mockPayments = [
  {
    id: "PAY-001",
    orderId: "ORD-001",
    customer: "John Smith",
    amount: 349.97,
    method: "credit_card",
    provider: "Stripe",
    status: "completed",
    transactionId: "txn_1234567890",
    date: "2024-01-20",
    currency: "USD",
    fees: 10.15,
    netAmount: 339.82,
    cardLast4: "4242",
    cardBrand: "Visa",
  },
  {
    id: "PAY-002",
    orderId: "ORD-002",
    customer: "Sarah Johnson",
    amount: 89.99,
    method: "paypal",
    provider: "PayPal",
    status: "completed",
    transactionId: "pp_9876543210",
    date: "2024-01-18",
    currency: "USD",
    fees: 2.88,
    netAmount: 87.11,
  },
  {
    id: "PAY-003",
    orderId: "ORD-003",
    customer: "Mike Chen",
    amount: 99.98,
    method: "bank_transfer",
    provider: "Bank Transfer",
    status: "pending",
    transactionId: "bt_5555666677",
    date: "2024-01-19",
    currency: "USD",
    fees: 0,
    netAmount: 99.98,
  },
  {
    id: "PAY-004",
    orderId: "ORD-004",
    customer: "Emma Davis",
    amount: 149.99,
    method: "credit_card",
    provider: "Stripe",
    status: "refunded",
    transactionId: "txn_1111222233",
    date: "2024-01-17",
    currency: "USD",
    fees: -4.35,
    netAmount: 145.64,
    cardLast4: "1234",
    cardBrand: "Mastercard",
    refundDate: "2024-01-19",
    refundAmount: 149.99,
  },
  {
    id: "PAY-005",
    orderId: "ORD-005",
    customer: "Alex Wilson",
    amount: 299.99,
    method: "apple_pay",
    provider: "Stripe",
    status: "failed",
    transactionId: "txn_9999888877",
    date: "2024-01-21",
    currency: "USD",
    fees: 0,
    netAmount: 0,
    failureReason: "Insufficient funds",
  },
];

export default function PaymentStatusPage() {
  const [payments, setPayments] = useState(mockPayments);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || payment.status === statusFilter;
    const matchesMethod =
      methodFilter === "all" || payment.method === methodFilter;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="border-green-500 text-green-700">
            Completed
          </Badge>
        );
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      case "refunded":
        return (
          <Badge
            variant="outline"
            className="border-orange-500 text-orange-700">
            Refunded
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "credit_card":
        return <CreditCard className="w-4 h-4" />;
      case "paypal":
        return (
          <div className="w-4 h-4 bg-blue-600 rounded text-white text-xs flex items-center justify-center">
            P
          </div>
        );
      case "apple_pay":
        return (
          <div className="w-4 h-4 bg-black rounded text-white text-xs flex items-center justify-center">
            A
          </div>
        );
      case "bank_transfer":
        return <DollarSign className="w-4 h-4" />;
      default:
        return <CreditCard className="w-4 h-4" />;
    }
  };

  const getMethodName = (method: string) => {
    switch (method) {
      case "credit_card":
        return "Credit Card";
      case "paypal":
        return "PayPal";
      case "apple_pay":
        return "Apple Pay";
      case "bank_transfer":
        return "Bank Transfer";
      default:
        return method;
    }
  };

  const statusCounts = {
    all: payments.length,
    completed: payments.filter((p) => p.status === "completed").length,
    pending: payments.filter((p) => p.status === "pending").length,
    failed: payments.filter((p) => p.status === "failed").length,
    refunded: payments.filter((p) => p.status === "refunded").length,
  };

  const totalRevenue = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.netAmount, 0);

  const totalFees = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.fees, 0);

  return (
    <div className="flex flex-col">
      <DashboardHeader
        title="Payment Status"
        description="Monitor payment transactions and methods"
      />

      <main className="flex-1 p-4 lg:p-6 space-y-6">
        {/* Payment Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totalRevenue.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                Net amount after fees
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Processing Fees
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalFees.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Total fees paid</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statusCounts.completed}</div>
              <p className="text-xs text-muted-foreground">
                Successful payments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Failed</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statusCounts.failed}</div>
              <p className="text-xs text-muted-foreground">
                Failed transactions
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search payments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>

              <Select value={methodFilter} onValueChange={setMethodFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="credit_card">Credit Card</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="apple_pay">Apple Pay</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Payments List */}
        <Card>
          <CardHeader>
            <CardTitle>
              Payment Transactions ({filteredPayments.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Payment ID</th>
                    <th className="text-left p-2">Order</th>
                    <th className="text-left p-2">Customer</th>
                    <th className="text-left p-2">Method</th>
                    <th className="text-left p-2">Amount</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Date</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="border-b hover:bg-muted/50">
                      <td className="p-2">
                        <div>
                          <div className="font-medium">{payment.id}</div>
                          <div className="text-xs text-muted-foreground font-mono">
                            {payment.transactionId}
                          </div>
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="font-medium">{payment.orderId}</div>
                      </td>
                      <td className="p-2">
                        <div className="font-medium">{payment.customer}</div>
                      </td>
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          {getMethodIcon(payment.method)}
                          <div>
                            <div className="font-medium">
                              {getMethodName(payment.method)}
                            </div>
                            {payment.cardLast4 && (
                              <div className="text-xs text-muted-foreground">
                                {payment.cardBrand} •••• {payment.cardLast4}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-2">
                        <div>
                          <div className="font-medium">${payment.amount}</div>
                          <div className="text-xs text-muted-foreground">
                            Net: ${payment.netAmount}
                          </div>
                        </div>
                      </td>
                      <td className="p-2">{getStatusBadge(payment.status)}</td>
                      <td className="p-2">
                        <div className="text-sm">{payment.date}</div>
                        {payment.refundDate && (
                          <div className="text-xs text-muted-foreground">
                            Refunded: {payment.refundDate}
                          </div>
                        )}
                      </td>
                      <td className="p-2">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                          {payment.status === "completed" && (
                            <Button variant="ghost" size="sm">
                              Refund
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
