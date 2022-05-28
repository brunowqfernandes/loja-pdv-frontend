

export function Modal(props) {
  
  return (
    <>
      {props.show ? (
        <>
          <div
            className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none py-4"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none overflow-x-hidden overflow-y-auto modal-box">
                {/*header*/}
                <div className="flex items-start justify-center p-5 rounded-t">
                  <h3 className="text-3xl font-semibold text-center w-full">
                    {props.title}
                  </h3>
                  <button
                    className="ml-auto border-0 flex items-center float-right text-3xl font-semibold rounded-full h-8 w-8 justify-center outline-none focus:outline-none "
                    onClick={() => props.showModal(false)}
                    aria-label="Fechar modal"
                  >
                    <span className="text-black text-2xl outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                {<div className="relative py-2 px-6 flex-auto">
                  {props.children}
                </div>}
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}