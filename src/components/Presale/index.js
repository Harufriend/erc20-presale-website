import FadeIn from "react-fade-in/lib/FadeIn"

import { makeUnified } from "utils"

import "./style.scss"

const PresaleComponent = ({
  buyerAddress = "0x",
  startTimeLeft = -1,
  endTimeLeft = 0,
  token = { name: "IMP Pay", symbol: "IMP", decimal: 18 },
  tokenContract = {
    address: "0xtumacontractplaceholderfordevelopment",
  },
  presaleContract = "",
  presaleSupply = 1000000,
  rate = 0,
  softcap = 0,
  hardcap = 0,
  minbuy = 0,
  maxbuy = 0,
  startdate = 1666666666,
  enddate = 1666677777,
  raisedamount = 0,
  sold = 0,
  buyerBase = 0,
  buyerSale = 0,
  result = 2,
  txStatus = "pending",
  onBaseChangeHandler = () => {},
  onDepositHandler = () => {},
  onClaimHandler = () => {},
  onWithdrawBaseHandler = () => {},
}) => (
  <div className="presale flex">
    <FadeIn className="presale-wrapper container flex">
      <div className="presale-main flex-column rounded shadowed">
        <div className="divider flex flex-column">
          <p className="rounded">Token Information</p>
        </div>
        <div className="presale-main-block flex flex-column">
          <p className="flex">
            <span>Token Name:</span>
            <span>{token.name}</span>
          </p>
          <p className="flex">
            <span>Token Symbol:</span>
            <span>{token.symbol}</span>
          </p>
          <p className="flex">
            <span>Token Decimal:</span>
            <span>{token.decimal}</span>
          </p>
          <p className="flex">
            <span>Token Address:</span>
            <a
              href={tokenContract.explorerUrl}
              target="_blank"
              rel="noreferrer"
            >
              {tokenContract.address}
            </a>
          </p>
          <p className="flex">
            <span>Presale Supply:</span>
            <span>
              {makeUnified(presaleSupply)} {token.symbol}
            </span>
          </p>
        </div>
        <div className="divider flex flex-column">
          <p className="rounded">Presale Information</p>
        </div>
        <div className="presale-main-block flex flex-column">
          <p className="flex">
            <span>Presale Address:</span>
            <a
              href={presaleContract.explorerUrl}
              target="_blank"
              rel="noreferrer"
            >
              {presaleContract.address}
            </a>
          </p>
          <p className="flex">
            <span>Token Rate:</span>
            <span>{rate.toExponential()}</span>
          </p>
          <p className="flex">
            <span>Softcap:</span>
            <span>{makeUnified(Number(softcap))} CRO</span>
          </p>
          <p className="flex">
            <span>Hardcap:</span>
            <span>{makeUnified(Number(hardcap))} CRO</span>
          </p>
          <p className="flex">
            <span>Min Buy:</span>
            <span>{Number(minbuy)} CRO</span>
          </p>
          <p className="flex">
            <span>Max Buy:</span>
            <span>{Number(maxbuy)} CRO</span>
          </p>
          <p className="flex">
            <span>Start Date:</span>
            <span>
              {startTimeLeft === -1
                ? "Coming soon"
                : new Date(startdate * 1000).toUTCString()}
            </span>
          </p>
          <p className="flex">
            <span>End Date:</span>
            <span>
              {startTimeLeft === -1
                ? "Coming soon"
                : new Date(enddate * 1000).toUTCString()}
            </span>
          </p>
        </div>
        <div className="divider flex flex-column">
          <p className="rounded">Presale Status</p>
        </div>
        <div className="presale-main-block flex flex-column">
          <p className="flex">
            <span>Raised:</span>
            <span>{makeUnified(raisedamount)} CRO</span>
          </p>
          <p className="flex">
            <span>Sold</span>
            <span>
              {makeUnified(Number(sold))} {token.symbol}
            </span>
          </p>
        </div>
        <div
          className={`presale-main-sale${
            result === undefined
              ? " presale-loading"
              : result === 0
              ? " presale-queued"
              : result === 1
              ? " presale-active"
              : result === 2
              ? " presale-success"
              : result === 3
              ? " presale-inactive"
              : " presale-inactive"
          } flex`}
        >
          {result === undefined ? (
            <span className="rounded">Loading</span>
          ) : result === 0 ? (
            <span className="rounded">Queued</span>
          ) : result === 1 ? (
            <span className="rounded">Active</span>
          ) : result === 2 ? (
            startTimeLeft === -1 ? (
              <span className="rounded">Coming soon</span>
            ) : (
              <span className="rounded">Success</span>
            )
          ) : result === 3 ? (
            <span className="rounded">Failure</span>
          ) : (
            <span className="rounded">Wrong Network</span>
          )}
        </div>
        {Object.keys(startTimeLeft).length === 0 ? (
          buyerAddress === undefined || buyerAddress === "" ? (
            // Todo: change to wallet button
            <button className="rounded">Connect Wallet</button>
          ) : Number(buyerBase) === 0 ? (
            result === 3 || result === 2 ? (
              startTimeLeft === -1 ? (
                <div className="presale-main-block flex flex-column">
                  <h3>Coming Soon</h3>
                </div>
              ) : (
                <div className="presale-main-block flex flex-column">
                  <h3>Presale has ended</h3>
                </div>
              )
            ) : (
              // If buyer didn't buy any token
              <>
                <div className="presale-main-buy flex flex-column">
                  <span>Buy {token.symbol} Token</span>
                  <label htmlFor="amount">Amount to Buy</label>
                  <input
                    id="amount"
                    type="number"
                    placeholder="$CRO 1"
                    onChange={(e) => onBaseChangeHandler(e)}
                  />
                </div>
                <button
                  className="rounded"
                  onClick={
                    txStatus === "Pending" ? () => {} : () => onDepositHandler()
                  }
                >
                  Buy
                </button>
              </>
            )
          ) : (
            // If buyer has something to claim
            <>
              <div className="presale-main-block flex flex-column">
                <p className="flex">
                  <span>Sent:</span>
                  <span>{makeUnified(buyerBase)} CRO</span>
                </p>
                <p className="flex">
                  <span>Bought:</span>
                  <span>
                    {makeUnified(Number(buyerSale))} {token.symbol}
                  </span>
                </p>
              </div>
              {Object.keys(endTimeLeft).length === 0 ? (
                <>
                  {result === 3 ? (
                    // If presale failed
                    <button
                      onClick={
                        txStatus === "Pending"
                          ? () => {}
                          : () => onWithdrawBaseHandler()
                      }
                    >
                      Get Refund
                    </button>
                  ) : (
                    // If presale succeed
                    <button
                      onClick={
                        txStatus === "Pending"
                          ? () => {}
                          : () => onClaimHandler()
                      }
                    >
                      Claim
                    </button>
                  )}
                </>
              ) : (
                // If presale is ongoing
                <div className="presale-timer grid">
                  <div className="counter flex flex-column">
                    <div className="flex rounded shadowed">
                      <span>{endTimeLeft.days[0]}</span>
                      <span>{endTimeLeft.days[1]}</span>
                    </div>
                    <span>Day</span>
                  </div>
                  <div className="counter flex flex-column">
                    <div className="flex rounded shadowed">
                      <span>{endTimeLeft.hours[0]}</span>
                      <span>{endTimeLeft.hours[1]}</span>
                    </div>
                    <span>Hrs</span>
                  </div>
                  <div className="counter flex flex-column">
                    <div className="flex rounded shadowed">
                      <span>{endTimeLeft.minutes[0]}</span>
                      <span>{endTimeLeft.minutes[1]}</span>
                    </div>
                    <span>Min</span>
                  </div>
                  <div className="counter flex flex-column">
                    <div className="flex rounded shadowed">
                      <span>{endTimeLeft.seconds[0]}</span>
                      <span>{endTimeLeft.seconds[1]}</span>
                    </div>
                    <span>Sec</span>
                  </div>
                </div>
              )}
            </>
          )
        ) : (
          // Wait for start
          <div className="presale-timer grid">
            <div className="counter flex flex-column">
              <div className="flex rounded shadowed">
                <span>{startTimeLeft.days[0]}</span>
                <span>{startTimeLeft.days[1]}</span>
              </div>
              <span>Day</span>
            </div>
            <div className="counter flex flex-column">
              <div className="flex rounded shadowed">
                <span>{startTimeLeft.hours[0]}</span>
                <span>{startTimeLeft.hours[1]}</span>
              </div>
              <span>Hrs</span>
            </div>
            <div className="counter flex flex-column">
              <div className="flex rounded shadowed">
                <span>{startTimeLeft.minutes[0]}</span>
                <span>{startTimeLeft.minutes[1]}</span>
              </div>
              <span>Min</span>
            </div>
            <div className="counter flex flex-column">
              <div className="flex rounded shadowed">
                <span>{startTimeLeft.seconds[0]}</span>
                <span>{startTimeLeft.seconds[1]}</span>
              </div>
              <span>Sec</span>
            </div>
          </div>
        )}
      </div>
    </FadeIn>
  </div>
)

export default PresaleComponent
