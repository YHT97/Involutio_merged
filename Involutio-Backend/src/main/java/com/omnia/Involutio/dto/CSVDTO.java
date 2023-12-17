package com.omnia.Involutio.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CSVDTO {
    private String email;
    private int sent_messages;
    private int received_messages;
    private int recipients_count;
    private int bcc_recipients_count;
    private int cc_recipients_count;
    private int unread_messages_4_hours;
    private int days_between_receive_and_read;
    private int replied_messages;
    private int outgoing_message_length;
    private int messages_outside_working_hours;
    private double received_sent_ratio;
    private double bytes_received_sent_ratio;
    private int unanswered_question_count;
}
