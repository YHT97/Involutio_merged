package com.omnia.Involutio.entity;

import com.omnia.Involutio.dto.CSVDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDate;

@Entity
@Data
@Slf4j
@NoArgsConstructor
public class CSVEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String email;
    private int sentMessages;
    private int receivedMessages;
    private int recipientsCount;
    private int bccRecipientsCount;
    private int ccRecipientsCount;
    private int unreadMessages4Hours;
    private int daysBetweenReceiveAndRead;
    private int repliedMessages;
    private int outgoingMessageLength;
    private int messagesOutsideWorkingHours;
    private double receivedSentRatio;
    private double bytesReceivedSentRatio;
    private int unansweredQuestionCount;
    private LocalDate date;

    public CSVEntity(CSVDTO dto) {
        this.email = dto.getEmail();
        this.sentMessages = dto.getSent_messages();
        this.receivedMessages = dto.getReceived_messages();
        this.recipientsCount = dto.getRecipients_count();
        this.bccRecipientsCount = dto.getBcc_recipients_count();
        this.ccRecipientsCount = dto.getCc_recipients_count();
        this.unreadMessages4Hours = dto.getUnread_messages_4_hours();
        this.daysBetweenReceiveAndRead = dto.getDays_between_receive_and_read();
        this.repliedMessages = dto.getReplied_messages();
        this.outgoingMessageLength = dto.getOutgoing_message_length();
        this.messagesOutsideWorkingHours = dto.getMessages_outside_working_hours();
        this.receivedSentRatio = dto.getReceived_sent_ratio();
        this.bytesReceivedSentRatio = dto.getBytes_received_sent_ratio();
        this.unansweredQuestionCount = dto.getUnanswered_question_count();
        this.date = LocalDate.now();
    }
}
