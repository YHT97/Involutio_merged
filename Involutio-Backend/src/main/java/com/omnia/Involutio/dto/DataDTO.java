package com.omnia.Involutio.dto;

import com.omnia.Involutio.entity.CSVEntity;


public class DataDTO {
    private static final double WEIGHT_SENT_MESSAGES = 0.1;
    private static final double WEIGHT_RECEIVED_MESSAGES = 0.1;
    private static final double WEIGHT_RECIPIENTS = 0.05;
    private static final double WEIGHT_BCC_RECIPIENTS = 0.05;
    private static final double WEIGHT_CC_RECIPIENTS = 0.05;
    private static final double WEIGHT_LATE_READ_MESSAGES = 0.15;
    private static final double WEIGHT_DAYS_BETWEEN = 0.05;
    private static final double WEIGHT_REPLIED_MESSAGES = 0.1;
    private static final double WEIGHT_OUTGOING_MESSAGE_LENGTH = 0.1;
    private static final double WEIGHT_OUTSIDE_WORKING_HOURS = 0.05;
    private static final double WEIGHT_RECEIVED_SENT_RATIO = 0.05;
    private static final double WEIGHT_BYTES_RECEIVED_SENT_RATIO = 0.05;
    private static final double WEIGHT_UNANSWERED_QUESTIONS = 0.1;

    private static final double MIN_PROBABILITY = 0.0;
    private static final double MAX_PROBABILITY = 100.0;

    public static int calculateEmployeeAttritionProbability(CSVEntity data) {
        double probability = 0.0;

        probability += data.getSentMessages() * WEIGHT_SENT_MESSAGES;
        probability += data.getReceivedMessages() * WEIGHT_RECEIVED_MESSAGES;
        probability += data.getRecipientsCount() * WEIGHT_RECIPIENTS;
        probability += data.getBccRecipientsCount() * WEIGHT_BCC_RECIPIENTS;
        probability += data.getCcRecipientsCount() * WEIGHT_CC_RECIPIENTS;
        probability += data.getUnreadMessages4Hours() * WEIGHT_LATE_READ_MESSAGES;
        probability += data.getDaysBetweenReceiveAndRead() * WEIGHT_DAYS_BETWEEN;
        probability += data.getRepliedMessages() * WEIGHT_REPLIED_MESSAGES;
        probability += data.getOutgoingMessageLength() * WEIGHT_OUTGOING_MESSAGE_LENGTH;
        probability += data.getMessagesOutsideWorkingHours() * WEIGHT_OUTSIDE_WORKING_HOURS;
        probability += data.getReceivedSentRatio() * WEIGHT_RECEIVED_SENT_RATIO;
        probability += data.getBytesReceivedSentRatio() * WEIGHT_BYTES_RECEIVED_SENT_RATIO;
        probability += data.getUnansweredQuestionCount() * WEIGHT_UNANSWERED_QUESTIONS;

        probability = Math.max(MIN_PROBABILITY, probability);
        probability = Math.min(MAX_PROBABILITY, probability);

        return (int) probability;
    }
}