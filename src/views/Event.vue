<template>
  <div class="section container">
    <EventCard>
      <template v-slot:image>
        <div class="image" :style="render_background(selected_event.image)"></div>
      </template>
      <template v-slot:name>
        <p class="title is-4">{{selected_event.name}}</p>
      </template>
      <template v-slot:location>
        <p class="subtitle is-6">{{selected_event.location}}</p>
      </template>
      <template v-slot:description>
        <div class="content mb-0" style="display: block">{{selected_event.description}}</div>
      </template>
      <template v-slot:dates>
        <p>{{ selected_event.start_date | formatTime }}</p>
      </template>
      <template v-slot:price>
        <p>{{selected_event.currency_symbol}}{{selected_event.price}} ({{selected_event.currency}})</p>
      </template>
    </EventCard>
    <p class="is-danger">{{error_message}}</p>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard";
export default {
  components: {
    EventCard
  },
  data() {
    return {
      selected_event: {},
      error_message: ""
    };
  },
  computed: {
    stored_event() {
      return this.$store.getters.stored_event;
    }
  },
  mounted() {
    this.get_event();
  },
  methods: {
    async get_event() {
      if (this.stored_event.length > 0) {
          this.selected_event = this.stored_event;
      }
      else {
      try {
        const events = await this.$http.get(
          `/events/by_id?id=${this.$route.params.id}`
        );
        if (events.length > 1)
          this.error_message =
            "Sorry, there been an error retrieving this specific event.";
        this.selected_event = events.data.events;
      } catch (error) {
        this.error_message = error.response.data;
      }
      }
    },
    render_background(image) {
      return `background: url(${image})`;
    }
  },
  filters: {
    formatTime(value) {
      if (!value) return "";
      let date = new Date(value.replace(" ", "T"));
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const month = monthNames[date.getMonth()];
      const day = String(date.getDate()).padStart(2, "0");
      const year = date.getFullYear();
      const output = month + "\n" + day + ", " + year;
      return output;
    }
  }
};
</script>