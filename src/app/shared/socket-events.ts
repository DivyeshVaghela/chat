export enum IncomingSocketEvents {

  /**
   * Joining of a new user
   * 
   * data
   * to: mobileNumber of the receiver
   * message: message
   */
  JOIN_SUCCESS = 'JOIN_SUCCESS',

  /**
   * When a new user joins
   * 
   * data
   * user: object
   *  mobileNumber: mobileNumber of the newly joined user
   */
  USER_JOINED = 'USER_JOINED',

  /**
   * receive messages
   */
  MESSAGE = 'RECEIVE_MESSAGE'
}

export enum OutgoingSocketEvents {
  
  /**
   * Joining of a new user
   * 
   * data
   * mobileNo: Unique mobile no
   */
  JOIN = 'JOIN',

  /**
   * send messages
   */
  MESSAGE = 'SEND_MESSAGE'
}