import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get Ticket - Queue Management System',
  description: 'Select a service and get your ticket to join the queue',
  keywords: ['ticket', 'queue', 'service', 'management'],
  robots: 'noindex, nofollow', // Appropriate for internal app pages
};

export default function GetTicketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}