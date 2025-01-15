<template>
  <div class="row bgCover noBorder borderSolid border3px cornersAll radius0 shadow0 P0-top P0-bottom P0H noTopMargin" style="padding-top: 20px; padding-bottom: 20px; margin: 0;">
    <div class="col-md-4 innerContent" style="padding: 0 10px">
      <img src="//www.kampanjeskjema.no/hosted/images/68/1729a9da9e4e9cbf62f3efeda038de/tannundersokelse.png" alt="" width="80" style="margin-top: 40px;">
      <h2 style="text-align: center; font-size: 20px; color: rgb(30, 85, 137); margin-top: 0;"><b>Undersøkelse</b></h2>
      <h2 style="text-align: left; font-size: 18px; color: rgb(0, 0, 0); margin-top: 20px;">Komplett tannhelsesjekk inkludert røntgen, diagnostikk, fjerning av tannstein og grundig rens</h2>
    </div>
    <div class="col-md-4 innerContent" style="padding: 0 10px">
      <img src="//www.kampanjeskjema.no/hosted/images/b7/2e0e9084a444278c9c2a6a23cb8521/Rontgen.png" alt="" width="80" style="margin-top: 40px;">
      <h2 style="text-align: center; font-size: 20px; color: rgb(30, 85, 137); margin-top: 0;"><b>Røntgen</b></h2>
      <h2 style="text-align: left; font-size: 18px; color: rgb(0, 0, 0); margin-top: 20px;">Vi tar røntgenbilder av tennene dine for å få full oversikt over din tannhelse. Sammen går vi gjennom eventuelle funn.</h2>
    </div>
    <div class="col-md-4 innerContent" style="padding: 0 10px">
      <img src="//www.kampanjeskjema.no/hosted/images/66/4e20f7591048f2aac0555fe8c0d9e6/rens2222.png" alt="" width="80" style="margin-top: 40px;">
      <h2 style="text-align: center; font-size: 20px; color: rgb(30, 85, 137); margin-top: 0;"><b>Rens</b></h2>
      <h2 style="text-align: left; font-size: 18px; color: rgb(0, 0, 0); margin-top: 20px;">Vi renser tennene dine med Airflow, fjerner tannstein og misfargning. Resultatet er at tennene dine blir rene, glatte og hvite. Slik at du får et enda finere smil.</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DentalServices'
}
</script>

<style scoped>
.row {
  display: flex;
  justify-content: space-between;
}
.innerContent {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
