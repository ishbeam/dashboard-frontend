export class Report {
    constructor(props) {
        this.created_by = props.created_by;
        this.created_at = new Date(props.created_at);
        this.case_id = props.case_id;
        this.title = props.title;

        this.interventions = props.interventions;
        this.missed = props.missed;
        this.newly_identified_needs = props.newly_identified_needs;
        this.expense_items = props.expense_items;
        this.activities = props.activities;
    }
}