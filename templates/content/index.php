<div id="contentTable">
    <div class="menu-content">
        <a href="<?php echo($_['url']['index']); ?>"><span class="material-symbols-outlined">home</span></a>
        <span class="material-symbols-outlined">chevron_right</span>
        <span><?php p($l->t('Customer'));?></span>
        <span class="material-symbols-outlined">chevron_right</span>
        <button style="margin-left:3px;" type="button"  id="newClient"><?php p($l->t('Add customer'));?></button>
    </div>
    <table id="client" class="display tabledt" style="font-size:11px;">
        <thead>
            <tr>
                <th class="help-heading" title="<?php p($l->t('Enter the customer company or legal business name. In France, the buyer identity must appear on invoices.'));?>"><?php p($l->t('Company'));?></th>
                <th class="help-heading" title="<?php p($l->t('Enter the customer first name. Use it with the last name for an individual customer or contact.'));?>"><?php p($l->t('First name'));?></th>
                <th class="help-heading" title="<?php p($l->t('Enter the customer last name. In France, an individual buyer must be identified by name on the invoice.'));?>"><?php p($l->t('Last name'));?></th>
                <th class="help-heading" title="<?php p($l->t('Enter additional legal information to display on customer documents, such as legal form, registration details or a specific legal notice.'));?>"><?php p($l->t('Legal information'));?></th>
                <th class="help-heading" title="<?php p($l->t('Enter the business identifier. For a French business customer, use the 9-digit SIREN. The customer SIREN is required for French electronic invoicing where applicable from 1 September 2026.'));?>"><?php p($l->t('Company identification/Siren'));?></th>
                <th class="help-heading" title="<?php p($l->t('Enter the customer intra-Community VAT number when applicable. A French VAT number contains FR, a 2-digit key and the 9-digit SIREN. It is required on French invoices in particular when the business customer is liable for VAT, including reverse charge cases.'));?>"><?php p($l->t('Intra-community VAT'));?></th>
                <th class="help-heading" title="<?php p($l->t('Enter a customer contact phone number, preferably with its international country prefix. This is contact information and is not a general mandatory invoice field in France.'));?>"><?php p($l->t('Phone number'));?></th>
                <th class="help-heading" title="<?php p($l->t('Enter a valid customer email address used for contact and document delivery. This is not a general mandatory invoice field in France.'));?>"><?php p($l->t('Email'));?></th>
                <th class="help-heading" title="<?php p($l->t('Enter the street and number of the customer address. In France, the buyer address and any distinct billing address must appear on invoices.'));?>"><?php p($l->t('Address'));?></th>
                <th class="help-heading" title="<?php p($l->t('Enter the postal code for the customer address. Use the 5-digit postal code for a standard French address.'));?>"><?php p($l->t('Zip code'));?></th>
                <th class="help-heading" title="<?php p($l->t('Enter the city or locality of the customer address. It forms part of the mandatory buyer address on French invoices.'));?>"><?php p($l->t('City name'));?></th>
                <th class="help-heading" title="<?php p($l->t('Enter the customer country using its ISO 3166-1 alpha-2 code, for example FR for France. Country information is required for structured electronic invoice addresses.'));?>"><?php p($l->t('Country code'));?></th>
                <th class="help-heading" title="<?php p($l->t('Use this column to delete the customer record. Deletion cannot be used to replace legally required invoice retention.'));?>"><?php p($l->t('Actions'));?></th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
</div>
