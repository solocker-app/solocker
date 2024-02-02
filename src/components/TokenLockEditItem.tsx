export default function TokenLockEditItem(){
    <tr>
    <td>
      <input type="checkbox" />
    </td>
    <td className="flex space-x-1 items-center">
      <OverlapCoinIcon
        icons={[getCoinProps(null), getCoinProps(null)]}
      />
      <span>RAY/SOL</span>
    </td>
    <td>200 DOL</td>
    <td>Yesterday</td>
    <td>Cancel</td>
    <td className="flex items-center">
      <TokenLockEditItemMenu onAction={(action) => {}} />
    </td>
  </tr>
}