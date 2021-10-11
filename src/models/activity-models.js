import React, { Component } from 'react';
// import * as ActivityTypes from '../types/activity-types';

export default function ActivityModelParser(activityObj) {
    // const model = ActivityTypes.getModelFromCode(activityObj.activity_type);
    // console.log(model)

    return 'model';
}

// export class Activity {
//     constructor(props) {
//         this.activity_type = props.activity_type;
//         this.case_id = props.case_id;
//     }
// }

// var BaseSchema = new Schema({
//     activity_type: String,
  
//     activity_name: String,
//     // {
//       // type: String,
//       // enum: ACTIVITY_TYPES
//     // },
//     case_id: String,
//     code: String,
//     date: Date,
//     notes: Array,
  
//     created_at: Date,
  
//     updated_at: Date
  
//   }, options)
  
//   var times = new Schema({
//     start_time: Date,
//     end_time: Date
//   })
  
//   var trip = new Schema({
//     start_address: String,
//     end_address: String,
//     miles: Number
//   })
  
//   var CaseUpdateSchema = new Schema({
//     ...BaseSchema.obj
//   }, options)
  
  
//   var ClientInteractionSchema = new Schema({
//     ...BaseSchema.obj,
//     ...times.obj,
//     ...trip.obj,
//     action_steps: [
//       { is_complete: Boolean }
//     ],
//     todays_focus: String
//   }, options)
  
  
//   var MonthlySummarySchema = new Schema({
//     ...BaseSchema.obj,
//     ...times.obj,
//     action_steps: [
//       { is_complete: Boolean }
//     ],
//     behavioral_changes: Array,
//     needs_and_concerns: Array,
//     newly_identified_needs: Array
//   }, options)
  
  
//   var CaseRelatedActSchema = new Schema({
//     ...BaseSchema.obj,
//     ...times.obj,
//     ...trip.obj
//   }, options)
  
  
//   var ActivitySchema = new Schema({
//     case_id: String,
    
//     client: String,
    
//     // COMBAK might only reference client?
//     therapist_id: String,
    
//     activity_name: String,
    
//     code: {
//       type: String,
//       default: "XXX"
//     },
    
//     date: {
//       type: Date,
//       default: new Date()
//     },
    
//     start_time: {
//       type: Date,
//       default: new Date()
//     },
    
//     end_time: {
//       type: Date,
//       default: new Date()
//     },
    
//     // COMBAK set this value on a pre save hook
//     elapsed_time_mins: {
//       type: Number,
//       default: 0
//     },
    
//     todays_focus: {
//       type: String,
//       default: ""
//     },
//       // either type of i_action_step or strings for _id
//       // find a way to indicate that these aren't set explicitly, their "helper " props
//       steps: [
//       { 
//         // ...
//               is_complete: Boolean
//       }
//     ],
    
//     start_address: {
//       type: String,
//       default: ""
//     },
//     end_address: {
//       type: String,
//       default: ""
//     },
//     travel_time: String,
//     miles: Number,
    
//     created_at: {
//       type: Date,
//       get: (v: string) => Date.parse(v),
//       set: (v: string) => Date.parse(v)
//     },
    
//     updated_at: Date
//   }, options)
  