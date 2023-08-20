'use client'
import { useParams } from 'next/navigation'
import axios from "axios";
import { SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './styles.module.css'
import { Inter} from 'next/font/google';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { UserContext } from '../../userContext';
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Logbook',
  description: 'Display Order',
}



const inter = Inter({ subsets: ['latin'] })

export default function Displayorder() {
  //@ts-ignore
  const { user, setHeaderTitle, checkSession,authTokens, apiRoute  } = useContext(UserContext);
  const params = useParams();
  const [order, setOrder] = useState<any>([]);
  const [pn, setPn] = useState<any>([])
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [physical_qty, setPhysicalQty] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [physical_insp, setPhysical_insp] = useState("");
  const [audit, setAudit] = useState("");
  const [dhra, setDhra] = useState("");
  const [destruc, setDestruc] = useState("");
  const [identification, setIdentification] = useState("");
  
  const getOrder = async () => {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + authTokens.access  
      }
    };
    try {
      const response = await axios.get(`${apiRoute}order/${params.id}/`,config);
      setOrder(response.data);
      setPn(response.data.pn);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const getComments = async () => {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + authTokens.access  
      }
    };
    try {
      const response = await axios.get(`${apiRoute}comments/${order.id}/`, config);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  function fromISOtoDate(date: string){
    var newDate = new Date (date);
    return (<div className={styles.commentDateTime}>{newDate.toLocaleDateString()},{newDate.toLocaleTimeString()}</div>)
  }

  useEffect(() => {
    checkSession()
    getOrder();
  }, []);

  useEffect(() => {
    if (order.number) {
      if (order.dhra){
        setDhra(order.dhra.username);
      }
      getComments()
      setOrderStatus(order.status.id);
      setPhysicalQty(order.physical_qty);
      setPhysical_insp(order.physical_inspection);
      setAudit(order.audit);
      setIdentification(order.identification);
      setDestruc(order.destructive_qty);
      setHeaderTitle(`Display Order ${order.number}`)
    }
  }, [order]);

  async function handleRefreshOrder() {
    getOrder();
    toast.success(`Order ${order.number} refreshed`);
  }

  async function handleSaveOrder() {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + authTokens.access  
      }
    };
    let date = new Date();
    let updatedOrder = {
      id : order.id,
      number : order.number,
      user_id : user.user_id,
      date : date.toISOString(),
      status_id : parseInt(orderStatus),
      dhra : dhra,
      physical_inspection : physical_insp,
      audit : audit,
      identification : identification,
      physical_qty : physical_qty,
      destructive_qty : destruc,
    }
  try {
    const response = await axios.put(`${apiRoute}order/update/${order.number}/`, updatedOrder, config);
    toast.success(response.data.success);
    getOrder();
    getComments()
  } catch (error) {
    //@ts-ignore
    toast.error(error.response.data.error);
  }
  }

  async function submitComment(e: { preventDefault: () => void; }) {
    e.preventDefault();
    let config = {
      headers: {
        'Authorization': 'Bearer ' + authTokens.access  
      }
    };
    if (newComment.length !== 0) {
      var date = new Date();
      var newComm = {
          order_id: order.id,
          user_id: user.user_id,
          date: date.toISOString(),
          comment: newComment,
          event: null,
      };
        try {
          const response = await axios.post(`${apiRoute}comment/add/`, newComm, config);
          console.log('Comment added successfully:', response.data);
          toast.success('Comment added successfully');
          getComments();
          setNewComment('');
        } catch (error) {
          console.error('Error adding comment:', error);
          toast.warn(`Error adding comment`);
          setNewComment('');
        }
      } else {toast.warn('Comment must not be blank')}
  }
  
  function eventDisplay(event: any) {
    if (event){
      let events = event.split('\n');
      return ( events.map((event:string) => <div>{event}</div> ))
    }}

  return (
    <main className={inter.className}>
      <section className={styles.displayOrder}>
      <div className={styles.section}>
      <div className={styles.sectionElement}>
        <div className={styles.sectionLabel}>Order</div>
        <div className={styles.sectionValueInactive}>{order.number}</div>  
      </div> 
      <div className={styles.sectionElement}>
        <div className={styles.sectionLabel}>Batch</div>
        <div className={styles.sectionValueInactive}>{order.batch}</div>  
      </div> 
      <div className={styles.sectionElement}>
        <div className={styles.sectionLabel}>Part Number</div>
        <div className={styles.sectionValueInactive}>{pn.id}</div>  
      </div> 
      <div className={styles.sectionElement}>
        <div className={styles.sectionLabel}>Description</div>
        <div className={styles.sectionValueInactive}>{pn.description}</div>  
      </div> 
      <div className={styles.sectionElement}>
        <div className={styles.sectionLabel}>Qty</div>
        <div className={styles.sectionValueInactive}>{order.qty}</div>  
      </div> 
      <div className={styles.sectionElement}>
        <div className={styles.sectionLabel}>Destructive/Bio</div>
        <div className={styles.sectionValue}>                
        <input
          autoComplete="off"
          className={styles.orderInput}
          type="number"
          value={destruc}
          name="destruc"
          onChange={(e) => setDestruc(e.target.value)}
          /></div>  
      </div> 
      <div className={styles.sectionElement}>
        <div className={styles.sectionLabel}>Physical Qty</div>
        <div className={styles.sectionValue}>                
        <input
          autoComplete="off"
          className={styles.orderInput}
          type="number"
          value={physical_qty}
          name="physical_qty"
          onChange={(e) => setPhysicalQty(e.target.value)}
        />
        </div>  
        </div> 
      </div>
      <div className={styles.section}>
      <div className={styles.sectionElement}>
        <div className={styles.sectionLabel}>Date</div>
        <div className={styles.sectionValueInactive}>{order.date}</div>  
      </div> 
      <div className={styles.sectionElement}>
        <div className={styles.sectionLabel}>Hour</div>
        <div className={styles.sectionValueInactive}>{order.hour}</div>  
      </div> 
      <div className={styles.sectionElement}>
        <div className={styles.sectionLabel}>Status</div>
        <div className={styles.sectionValue}>
        <select
          id="statusSelect"
          className={styles.orderInput}
          value={orderStatus}
          name="orderStatus"
          onChange={(e: { target: { value: SetStateAction<string>; }; }) => setOrderStatus(e.target.value)}>
          <option value="1">NEW</option>
          <option value="2">REOPEN</option>
          <option value="3">ASSIGNED</option>
          <option value="4">LIBERATED</option>
          <option value="5">NC</option>
          <option value="6">NCR</option>
          <option value="7">DN</option>
          <option value="8">PL</option>
          <option value="9">COMPLETE</option>
          <option value="10">REJECT</option>
        </select>
        </div>  
      </div> 
      <div className={styles.sectionElement}>
        <div className={styles.sectionLabel}>DHRA</div>
        <div className={styles.sectionValue}>
        <input
          autoComplete="off"
          className={styles.orderInput}
          type="text"
          value={dhra}
          name="user"
          onChange={(e) => setDhra(e.target.value)}
          />
        </div>  
      </div> 
      <div className={styles.sectionElement}>
        <div className={styles.sectionLabel}>Physical Inspection</div>
        <div className={styles.sectionValue}>
        <input
          autoComplete="off"
          className={styles.orderInput}
          type="text"
          value={physical_insp}
          name="physical_inspe"
          onChange={(e) => setPhysical_insp(e.target.value)}
                />
          </div>  
      </div> 

      <div className={styles.sectionElement}>
        <div className={styles.sectionLabel}>Audit</div>
        <div className={styles.sectionValue}>
        <input
          autoComplete="off"
          className={styles.orderInput}
          type="text"
          value={audit}
          name="audit"
          onChange={(e) => setAudit(e.target.value)}
                />
          </div>  
      </div> 

      <div className={styles.sectionElement}>
        <div className={styles.sectionLabel}>Identification</div>
        <div className={styles.sectionValue}>
        <input
          autoComplete="off"
          className={styles.orderInput}
          type="text"
          value={identification}
          name="identification"
          onChange={(e) => setIdentification(e.target.value)}
                />
          </div>  
      </div> 
    </div>
      <aside className={styles.aside}>
          <button
                type="button"
                title="Save"
                className={styles.btn}
                onClick={() => handleSaveOrder()}
          >
                <Image src="/disco.png" height="20" width="20" alt="disco" />
          </button>
              <button
                type="button"
                title="Refresh"
                className={styles.btn}
                onClick={() => handleRefreshOrder()}
              >
                <Image src="/refresh.png" height="20" width="20" alt="refresh" />
              </button>
      </aside>
      </section>
      {/* displayComments */}
      <section className={styles.comentSection}>
        {/* comment form */}
        <div className={styles.commentBox}>
          <form onSubmit={submitComment}>
            <div className={styles.inputFormBox}>
              <div className={styles.notesBox}>
                <p className={styles.notes}>Notes</p>
              </div>
              <div className={styles.inputBox}>
                <input
                  autoComplete="off"
                  className={styles.commentInput}
                  type="text"
                  value={newComment}
                  name="comment"
                  placeholder="Add a note"
                  onChange={(e) => setNewComment(e.target.value)}
                />
              </div>
              <div className={styles.submitBtnBox}>
                <button className={styles.submitBtn}>Submit</button>
              </div>
            </div>
          </form>
        </div>
        {comments.map((comment) => (
          <div className={styles.commentBox}>
              <div className={styles.commentInfo}>
                <div className={styles.commentUser}>
                  {comment.user.first_name}
                  </div> 
                  <div className={styles.commentUser}>
                  {comment.user.last_name}
                  </div> 
                <div className={styles.commentDate}>
                 at {fromISOtoDate(comment.date)} 
                </div>
                <small className={styles.commentId}>(c#{comment.id})</small>
              </div>
            <div className={styles.commentBody}>
              <div className={styles.commentText}>
                <p>{comment.comment}</p>
              </div>
              <div className={styles.commentEvent}>
              {eventDisplay(comment.event)}
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

