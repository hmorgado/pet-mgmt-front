const ReusableMessage = ({ text = "nothing passed", statusFunc, status }) => {
     if (status) {
        return (
            <div>
                <button onClick={() => statusFunc(null)}> {text} (X)</button>
            </div >
        )
    }
}

export default ReusableMessage;