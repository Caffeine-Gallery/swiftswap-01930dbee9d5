export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  return IDL.Service({
    'getCurrentRate' : IDL.Func([], [IDL.Text, IDL.Text, Time], ['query']),
    'updateExchangeRate' : IDL.Func([IDL.Text, IDL.Text], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
