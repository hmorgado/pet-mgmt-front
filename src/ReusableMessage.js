const ReusableMessage = ({ text = "nothing passed", statusFunc }) => {
    return (
        <div>
            <button onClick={() => statusFunc(null)}> {text} (X)</button>
        </div >
    )
}

export default ReusableMessage;