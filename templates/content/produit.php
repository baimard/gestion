<div id="contentTable">
    <center><h2>Produits</h2></center>
    <p>
        <button id="newProduit" type="button" class="mb-2 btn btn-outline-success" data-html2canvas-ignore>Ajouter un produit</button>
    </p>
	<table id="produit" class="display" style="table-layout: fixed; width: 100%; white-space: pre-wrap;">
        <thead>
            <tr>
                <th>Id</th>
                <th>reference</th>
                <th>description</th>
                <th>prix unitaire</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
	</table>
    <div class="bootstrap-iso">
        <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 5">
            <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <strong class="me-auto">Enregistrement</strong>
                </div>
                <div class="toast-body">
                    Les modifications ont été enregistrées
                </div>
            </div>
        </div>
    </div>
</div>