const AccountPanel = ({ menuOptions, panelIndex }) => {
  return (
    <div className="w-3/4 flex justify-center p-6">
        {menuOptions[panelIndex].component}
    </div>
  )
}

export default AccountPanel