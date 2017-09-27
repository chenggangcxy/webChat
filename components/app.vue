
<template>
  <div class="main">
      <div class="main-left">
          <div class="user-list">
              <div class="user-item" v-for="(val,key) in allUsers">
                  <i class="fa fa-user fa-3x fl"></i> 
                  <span class="user-name fl">{{key}}</span>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  el: "#app",   
  data: {
      name: currentUser,
      allUsers: {}
  },
  created: function(){
    var _this = this;  
    var socket = io.connect("http://localhost:8888?user=" + currentUser);
    socket.on("system",function(data){
        console.log(data)
        if(data.type == "go-online"){
            _this.allUsers = data.allIds;
            console.warn(data.user+"上线了...");
        }
        if(data.type == "off-online"){
             _this.allUsers = data.allIds;
            console.warn(data.user+"下线了...")
        }
    })
  }
}
</script>



