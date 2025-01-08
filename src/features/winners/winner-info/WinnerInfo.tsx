interface WinnerInfoProps {
  operatorId: string;
  currency: string;
  siteId: string;
  tickets: number;
}

export default function WinnerInfo({
  operatorId,
  currency,
  siteId,
  tickets,
}: WinnerInfoProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
          Player Information
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-sm text-gray-500">Operator ID</div>
            <div className="font-medium">{operatorId}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Currency</div>
            <div className="font-medium">{currency}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Site ID</div>
            <div className="font-medium">{siteId || '-'}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Total Tickets</div>
            <div className="font-medium">{tickets}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
