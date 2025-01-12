import { SettlementResult as SettlementResultType } from '../models/Round';

interface SettlementResultProps {
  result: SettlementResultType;
}

export default function SettlementResult({ result }: SettlementResultProps) {
  if (!result) return null;

  const formatProperty = (key: string, value: boolean) => {
    if (!value) return null;

    // Handle numbered properties (red1, red2, white3, etc.)
    const match = key.match(/^(red|white)(\d)$/);
    if (match) {
      const [, color, number] = match;
      return (
        <span key={key} className="inline-flex items-center">
          <span
            className={`
            w-5 h-5 rounded-full mr-1 border 
            ${color === 'red' ? 'bg-red-500 border-red-600' : 'bg-white border-gray-300'} 
            flex items-center justify-center text-xs font-bold
            ${color === 'white' ? 'shadow-inner' : ''}
          `}
          >
            {number}
          </span>
          <span className="font-semibold">
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </span>
        </span>
      );
    }

    // Handle even/odd
    return (
      <span key={key} className="font-semibold">
        {key.charAt(0).toUpperCase() + key.slice(1)}
      </span>
    );
  };

  const results = Object.entries(result)
    .map(([key, value]) => formatProperty(key, value))
    .filter(Boolean);

  return (
    <div className="text-sm text-gray-500 mt-1 flex flex-wrap items-center bg-gray-50 p-2 rounded">
      {results.map((item, index) => (
        <span key={index} className="flex items-center">
          {item}
          {index < results.length - 1 && <span className="mx-2">,</span>}
        </span>
      ))}
    </div>
  );
}
