<template>
  <div>
    <beautiful-chat 
      :always-scroll-to-bottom="alwaysScrollToBottom"
      :close="closeChat"
      :colors="colors"
      :is-open="isChatOpen"
      :message-list="messageList"
      :message-styling="messageStyling"
      :new-messages-count="newMessagesCount"
      :on-message-was-sent="onMessageWasSent"
      :open="openChat"
      :participants="participants"
      :show-emoji="true"
      :show-file="true"
      :show-typing-indicator="showTypingIndicator"
      :title-image-url="titleImageUrl"
      @on-type="handleOnType"
      @edit="editMessage"
    >
  </div>
</template>

<script>
const CloseIcon = "vue-beautiful-chat/src/assets/close-icon.png";
const OpenIcon = "vue-beautiful-chat/src/assets/logo-no-bg.svg";
const FileIcon = "vue-beautiful-chat/src/assets/file.svg";
const CloseIconSvg = "vue-beautiful-chat/src/assets/close.svg";

module.exports = {
  name: "app",
  data() {
    return {
      icons: {
        open: {
          img: OpenIcon,
          name: "default"
        },
        close: {
          img: CloseIcon,
          name: "default"
        },
        file: {
          img: FileIcon,
          name: "default"
        },
        closeSvg: {
          img: CloseIconSvg,
          name: "default"
        }
      },
      participants: [
        {
          id: "user1",
          name: "Detective",
          imageUrl: "https://avatars3.githubusercontent.com/u/1915989?s=230&v=4"
        },
      ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
      titleImageUrl:
        '',
      messageList: [
        { type: "text", author: `user1`, data: { text: `Did you killed someone?` } },
        { type: "text", author: `me`, data: { text: `No.` } }
      ], // the list of the messages to show, can be paginated and adjusted dynamically
      newMessagesCount: 0,
      isChatOpen: true, // to determine whether the chat window should be open or closed
      showTypingIndicator: "", // when set to a value matching the participant.id it shows the typing indicator for the specific user
      colors: {
        header: {
          bg: "#000",
          text: "#ffffff"
        },
        launcher: {
          bg: "#000"
        },
        messageList: {
          bg: "#000",
        },
        sentMessage: {
          bg: "#0F85FE",
          text: "#ffffff"
        },
        receivedMessage: {
          bg: "#eaeaea",
          text: "#222222"
        },
        userInput: {
          bg: "#000",
          text: "#565867"
        }
      }, // specifies the color scheme for the component
      alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
      messageStyling: true // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
    };
  },
  methods: {
    sendMessage(text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen
          ? this.newMessagesCount
          : this.newMessagesCount + 1;
        this.onMessageWasSent({
          author: "support",
          type: "text",
          data: { text }
        });
      }
    },
    onMessageWasSent(message) {
      // called when the user sends a message
      this.messageList = [...this.messageList, message];
    },
    openChat() {
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true;
      this.newMessagesCount = 0;
    },
    closeChat() {
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = false;
    },
    handleScrollToTop() {
      // called when the user scrolls message list to top
      // leverage pagination for loading another page of messages
    },
    handleOnType() {
      console.log("Emit typing event");
    },
    editMessage(message) {
      const m = this.messageList.find(m => m.id === message.id);
      m.isEdited = true;
      m.data.text = message.data.text;
    }
  }
};
</script>