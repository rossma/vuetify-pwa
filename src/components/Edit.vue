<template>
  <v-layout column>
    <v-alert color="success" icon="check_circle" dismissible v-model="alert.success">
      {{ alert.message }}
    </v-alert>
    <v-layout row wrap>
      <v-flex xs11 sm5>
        <v-text-field label="Test ID:" v-model="tagId" readonly></v-text-field>
        <v-menu lazy :close-on-content-click="false" v-model="menu" transition="scale-transition" offset-y
          full-width :nudge-right="40" max-width="290px" min-width="290px">
          <v-text-field slot="activator" label="Date Finished" v-model="tag.dateFinished"
            prepend-icon="event" readonly></v-text-field>
          <v-date-picker v-model="tag.dateFinished" no-title scrollable actions>
            <template scope="{ save, cancel }">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                <v-btn flat color="primary" @click="save">OK</v-btn>
              </v-card-actions>
            </template>
          </v-date-picker>
        </v-menu>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs11 sm5>
        <v-text-field label="Herd No:" v-model="tag.herdNo" readonly></v-text-field>
        <v-select label="PVP Usercode:" v-model="tag.pvpUsercode" :items="pvpUsercodes"></v-select>
      </v-flex>
      <v-divider class="mt-5"></v-divider>
      <v-flex xs11 sm5>
          <v-btn outline color="indigo" v-on:click="save">Save</v-btn>
          <v-btn outline color="indigo" v-on:click="complete">Complete</v-btn>
      </v-flex>
    </v-layout>
    <v-divider class="mt-3"></v-divider>
    <v-data-table v-bind:headers="headers" :items="tag.items" hide-actions class="elevation-1">
      <template slot="items" scope="props">
        <td>{{ (props.index + 1) }}</td>
        <td class="text-xs-center" nowrap>{{ props.item.name }}</td>
        <td class="text-xs-center">
          <v-select v-bind:items="statuses" v-model="props.item.status"></v-select>
        </td>
        <td class="text-xs-center"><input class="sm-1" type="text" v-model="props.item['1A']" /></td>
        <td class="text-xs-center"><input class="sm-1" type="text" v-model="props.item['1B']" /></td>
        <td class="text-xs-center"><input class="sm-1" type="text" v-model="props.item['4A']" /></td>
        <td class="text-xs-center">
          <v-select v-bind:items="swlItems" v-model="props.item.swlA"></v-select>
        </td>
        <td class="text-xs-center"><input class="sm-1" type="text" v-model="props.item['4B']" /></td>
        <td class="text-xs-center">
          <v-select v-bind:items="swlItems" v-model="props.item.swlB"></v-select>
        </td>
        <td class="text-xs-center">
          <v-select v-bind:items="resolutions" v-model="props.item.res"></v-select>
        </td>
        <td class="text-xs-center"><input type="text" v-model="props.item.location" /></td>
        <td class="text-xs-center"><span class="dialog-lnk" @click.stop="dnaTagDialog = true">{{ props.item.dnaTag.name }}</span></td>
        <td class="text-xs-center">
          <v-checkbox primary hide-details v-model="props.item.bt23Issued"></v-checkbox>
        </td>
        <td class="text-xs-center"><input type="text" v-model="props.item.remarks" /></td>
      </template>
    </v-data-table>
    <v-dialog v-model="dnaTagDialog">
      <v-card>
        <v-card-title>
          DNA Tag
        </v-card-title>
        <v-card-text>
          Modal form here
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" flat @click.stop="dnaTagDialog=false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
  import serverData from '../server/data.json'

  export default {
    name: 'edit',
    data () {
      return {
        alert: {
          success: false,
          error: false,
          message: ''
        },
        tagId: this.$route.params.id,
        tag: '',
        statuses: [
          { value: 1, text: 'Ok' },
          { value: 2, text: 'Err' }
        ],
        swlItems: ['AB', 'CD2'],
        resolutions: [ 'N', 'Y' ],
        menu: false,
        dateFinished: null,
        pvpUsercodes: [
          'Item 1',
          'Item 2',
          'Item 3',
          'Item 4'
        ],
        headers: [
          { text: 'IDX', value: 'idx', class: 'bob' },
          { text: 'Animal Tag', value: 'tag', align: 'center' },
          { text: 'Status', value: 'status', align: 'center' },
          { text: '1A', value: 'status', align: 'center' },
          { text: '1B', value: 'status', align: 'center' },
          { text: '4A', value: 'status', align: 'center' },
          { text: 'SWL A', value: 'status', align: 'center' },
          { text: '4B', value: 'status', align: 'center' },
          { text: 'SWL 4B', value: 'status', align: 'center' },
          { text: 'Res', value: 'status', align: 'center' },
          { text: 'Location', value: 'loc', align: 'center' },
          { text: 'DNA Tag', value: 'loc', align: 'center' },
          { text: 'BT23 Issued', value: 'loc', align: 'center' },
          { text: 'Remarks', value: 'loc', align: 'center' }
        ],
        dnaTagDialog: false
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        console.log('in here:' + this.$route.params.id + ' tagId: ' + this.tagId + ' items:' + JSON.stringify(this.items))
        if (navigator.onLine) {
          console.log('User is online - Fetching tag information from server')
          this.$set(this, 'tag', serverData.tags.find(item => item.id === parseInt(this.tagId)))
        } else {
          console.log('User is offline - Fetching tag information from localstorage')
          let tags = JSON.parse(localStorage.getItem('tags'))
          this.$set(this, 'tag', tags.find(item => item.id === parseInt(this.tagId)))
        }
        console.log('tag:' + JSON.stringify(this.tag))
      })
    },
    methods: {
      save () {
        // this.doSomeStuff()
        // need to get the background sync working...just not succeeding right now
        let newTags = this.getTags().filter(item => item.id !== parseInt(this.tagId))
        newTags.push(this.tag)
        localStorage.setItem('tags', JSON.stringify(newTags))
        this.alertSuccess('Record Saved')
      },
      complete () {
        if (navigator.onLine) {
          console.log('User is online - save the data to the server')
        } else {
          console.log('User is offline - need to save the data when user is back online')
        }
        this.alertSuccess('Record Completed')
      },
      getTags () {
        if (navigator.onLine) {
          return serverData.tags
        } else {
          return JSON.parse(localStorage.getItem('tags'))
        }
      },
      alertSuccess (message) {
        this.alert.error = false
        this.alert.message = message
        this.alert.success = true
      },
      alertError (message) {
        this.alert.success = false
        this.alert.message = message
        this.alert.error = true
      },
      doSomeStuff () {
        console.log('DOING SOME STUFF!!')
        // var message = 'Promise message'
        // return Promise.resolve(message)
        fetch('./static/img/v.png')
          .then(function (response) {
            console.log('returning some response')
            return response
          })
          .then(function (text) {
            console.log('Request successful', text)
          })
          .catch(function (error) {
            console.log('Request failed', error)
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  td input {
    border: 1px solid rgba(0,0,0,0.12);
  }

  div.input-group__selections__comma, div.list__tile__title {
    font-size:13px!important;
  }

  input.sm-1 {
    width: 25px;
  }

  input.sm-2 {
    width: 45px;
  }

  .dialog-lnk {
    color: indigo;
    cursor: pointer;
    border-bottom: 1px dashed indigo;
  }

  .alert {
    width: 100%;
  }
</style>
